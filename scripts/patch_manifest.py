import argparse
import json
import os
import shutil
import tempfile
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument("zip_path")
parser.add_argument("--ram", type=int, default=8160)
parser.add_argument("--name")
args = parser.parse_args()

fd, tmp_path = tempfile.mkstemp(suffix=".zip", dir=os.path.dirname(os.path.abspath(args.zip_path)))
os.close(fd)

with zipfile.ZipFile(args.zip_path) as src, zipfile.ZipFile(tmp_path, "w") as dst:
    for info in src.infolist():
        data = src.read(info)
        if info.filename == "manifest.json":
            manifest = json.loads(data)
            manifest["minecraft"]["recommendedRam"] = args.ram
            if args.name:
                manifest["name"] = args.name
            data = json.dumps(manifest, indent=2, ensure_ascii=False).encode("utf-8")
        dst.writestr(info, data)

shutil.move(tmp_path, args.zip_path)
print(f"Patched {args.zip_path}: recommendedRam={args.ram}" + (f", name={args.name}" if args.name else ""))
