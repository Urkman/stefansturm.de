#!/usr/bin/env python3
"""Merge single-page Chrome PDFs without rewriting their page resources."""

from __future__ import annotations

import re
import sys
from pathlib import Path


OBJECT_PATTERN = re.compile(rb"(?m)^(\d+)\s+(\d+)\s+obj(?:\r?\n|\s)")
REFERENCE_PATTERN = re.compile(rb"(?<!\d)(\d+)\s+(\d+)\s+R\b")
STREAM_PATTERN = re.compile(rb"\r?\nstream(?:\r?\n|\s)")


def parse_objects(data: bytes) -> list[tuple[int, int, bytes]]:
    objects = []
    matches = list(OBJECT_PATTERN.finditer(data))
    for index, match in enumerate(matches):
        end_limit = matches[index + 1].start() if index + 1 < len(matches) else len(data)
        end = data.find(b"\nendobj", match.end(), end_limit)
        if end == -1:
            end = data.find(b"\rendobj", match.end(), end_limit)
        if end == -1:
            raise ValueError("Could not find the end of a PDF object")
        body = data[match.end() : end]
        objects.append((int(match.group(1)), int(match.group(2)), body))
    if not objects:
        raise ValueError("PDF contains no indirect objects")
    return objects


def remap_references(data: bytes, mapping: dict[int, int]) -> bytes:
    def replace(match: re.Match[bytes]) -> bytes:
        object_number = int(match.group(1))
        generation = int(match.group(2))
        if generation != 0 or object_number not in mapping:
            return match.group(0)
        return f"{mapping[object_number]} 0 R".encode("ascii")

    return REFERENCE_PATTERN.sub(replace, data)


def remap_body(body: bytes, mapping: dict[int, int]) -> bytes:
    stream = STREAM_PATTERN.search(body)
    if stream:
        dictionary = remap_references(body[: stream.start()], mapping)
        return dictionary + body[stream.start() :]
    return remap_references(body, mapping)


def page_body(body: bytes, parent_id: int, mapping: dict[int, int]) -> bytes:
    remapped = remap_body(body, mapping)
    parent = re.compile(rb"/Parent\s+\d+\s+0\s+R")
    replacement = f"/Parent {parent_id} 0 R".encode("ascii")
    if parent.search(remapped):
        return parent.sub(replacement, remapped, count=1)
    closing = remapped.rfind(b">>")
    if closing == -1:
        raise ValueError("Page object has no dictionary")
    return remapped[:closing] + b"\n" + replacement + remapped[closing:]


def merge(output_path: Path, input_paths: list[Path]) -> None:
    parsed = [parse_objects(path.read_bytes()) for path in input_paths]
    next_id = 1
    remapped_objects: list[tuple[int, bytes]] = []
    page_ids: list[int] = []

    for objects in parsed:
        mapping = {}
        for object_number, _generation, _body in objects:
            mapping[object_number] = next_id
            next_id += 1

        page_number = None
        for object_number, _generation, body in objects:
            object_id = mapping[object_number]
            if re.search(rb"/Type\s*/Page(?:\s|>)", body):
                if page_number is not None:
                    raise ValueError("Each input PDF must contain exactly one page")
                page_number = object_id
            remapped_objects.append((object_id, remap_body(body, mapping)))

        if page_number is None:
            raise ValueError("Input PDF contains no page object")
        page_ids.append(page_number)

    pages_id = next_id
    catalog_id = next_id + 1
    pages_body = (
        f"\n<< /Type /Pages /Count {len(page_ids)} /Kids "
        f"[{ ' '.join(f'{page_id} 0 R' for page_id in page_ids) }] >>\n"
    ).encode("ascii")
    catalog_body = f"\n<< /Type /Catalog /Pages {pages_id} 0 R >>\n".encode("ascii")

    by_id = dict(remapped_objects)
    for page_id in page_ids:
        by_id[page_id] = page_body(by_id[page_id], pages_id, {})
    by_id[pages_id] = pages_body
    by_id[catalog_id] = catalog_body

    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0] * (catalog_id + 1)
    for object_id in range(1, catalog_id + 1):
        body = by_id.get(object_id)
        if body is None:
            continue
        offsets[object_id] = len(output)
        output.extend(f"{object_id} 0 obj".encode("ascii"))
        output.extend(body)
        if not body.endswith(b"\n"):
            output.extend(b"\n")
        output.extend(b"endobj\n")

    xref_offset = len(output)
    output.extend(f"xref\n0 {catalog_id + 1}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        if offset:
            output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
        else:
            output.extend(b"0000000000 00000 f \n")
    output.extend(
        (
            f"trailer\n<< /Size {catalog_id + 1} /Root {catalog_id} 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("ascii")
    )
    output_path.write_bytes(output)


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("usage: merge-pdfs.py OUTPUT INPUT...")
    merge(Path(sys.argv[1]), [Path(path) for path in sys.argv[2:]])


if __name__ == "__main__":
    main()
