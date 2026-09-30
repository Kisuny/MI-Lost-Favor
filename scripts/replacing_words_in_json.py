from pathlib import Path

ROOT = Path(r"C:\minecraft\modpacks\MI-Lost-Favor\kubejs\assets\emi\recipe\additions")

total_files = 0
updated_files = 0
total_replacements = 0

print(f"Scanning: {ROOT}")

for file_path in ROOT.rglob("*.json"):
    total_files += 1
    text = file_path.read_text(encoding="utf-8")
    occurrences = text.count("kubejs")

    if occurrences > 0:
        new_text = text.replace("kubejs", "milf")
        file_path.write_text(new_text, encoding="utf-8")
        updated_files += 1
        total_replacements += occurrences
        print(f"Updated: {file_path} ({occurrences} replacements)")
    else:
        print(f"Skipped:  {file_path}")

print("\nDone.")
print(f"Total JSON files: {total_files}")
print(f"Updated files:    {updated_files}")
print(f"Replacements:     {total_replacements}")