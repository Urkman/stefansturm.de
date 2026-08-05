const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const assets = [
  'assets/pdf/stefan-sturm-cv-de.pdf',
  'assets/pdf/stefan-sturm-cv-en.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-de.pdf',
  'assets/pdf/stefan-sturm-expanded-cv-en.pdf',
].map(asset => path.join(root, asset));

const audit = String.raw`
from pypdf import PdfReader
import sys

for filename in sys.argv[1:]:
    reader = PdfReader(filename)
    annotations = []
    for page in reader.pages:
        for raw_annotation in page.get('/Annots', []) or []:
            annotation = raw_annotation.get_object()
            if annotation.get('/Subtype') != '/Link':
                continue
            action = annotation.get('/A')
            action = action.get_object() if action else None
            if not action or action.get('/S') != '/URI' or not action.get('/URI'):
                raise SystemExit(f'{filename}: link does not have a URI action')
            if annotation.get('/H') != '/I':
                raise SystemExit(f'{filename}: link highlight mode is not standardized')
            if not annotation.get('/QuadPoints'):
                raise SystemExit(f'{filename}: link has no clickable quad points')
            annotations.append(str(action['/URI']))

    if len(annotations) < (4 if 'expanded' not in filename else 20):
        raise SystemExit(f'{filename}: expected more link annotations, found {len(annotations)}')
    if 'https://stefansturm.de/' not in annotations:
        raise SystemExit(f'{filename}: website link is missing')
`;

const result = spawnSync('python3', ['-c', audit, ...assets], { encoding: 'utf8' });
assert.equal(result.status, 0, result.stderr || result.stdout);
console.log('Generated PDF link contract passed');
