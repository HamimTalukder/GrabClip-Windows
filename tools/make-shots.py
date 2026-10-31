"""Makes the website screenshots from your 1920x1080 PNGs.

Run from the repo folder (the one that holds website/ and tools/):
    python tools/make-shots.py
    python tools/make-shots.py path/to/pngs          (other input folder)

Input  : website/assets2/shots/<name>.png   (default)
Output : website/assets/shots/<name>.webp
Needs  : pip install pillow
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "website" / "assets2" / "shots"
OUT = ROOT / "website" / "assets" / "shots"

# name: (crop box left, top, right, bottom or None for the whole window, resize to width or None)
SHOTS = {
    "downloads":        (None,                  1920),
    "library":          (None,                  1600),
    "home-page":        (None,                  1280),
    "add-1-link":       ((535, 341, 1385, 775),  None),
    "add-2-format":     ((535, 192, 1385, 923),  None),
    "add-3-extras":     ((535, 289, 1385, 827),  None),
    "scheduler":        ((625, 255, 1295, 860),  None),
    "send-to-phone":    ((625, 175, 1295, 941),  None),
    "player":           ((295,  38, 1625, 1078), None),
    "settings-general": ((310, 120, 1250, 711),  None),
    "settings-cookies": ((310, 120, 1250, 585),  None),
    "settings-updates": ((310, 120, 1250, 597),  None),
    "settings-help":    ((310, 120, 1250, 487),  None),
    "settings-about":   ((310, 120, 1250, 858),  None),
}

OUT.mkdir(parents=True, exist_ok=True)
for name, (box, width) in SHOTS.items():
    f = SRC / f"{name}.png"
    if not f.exists():
        print(f"missing  {f}")
        continue
    im = Image.open(f).convert("RGB")
    if im.size != (1920, 1080):
        print(f"skipped  {name}: is {im.size[0]}x{im.size[1]}, needs 1920x1080")
        continue
    if box:
        im = im.crop(box)
    if width and im.width != width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dest = OUT / f"{name}.webp"
    im.save(dest, "WEBP", quality=82, method=6)
    print(f"{name:17} {im.width}x{im.height}  {dest.stat().st_size // 1024} KB")
