#!/usr/bin/env python3
"""Reads the GoatCounter numbers and saves them to website/stats.json.

The About page draws its Site stats from that file. GitHub runs this every few
hours (see .github/workflows/stats.yml). To run it by hand:
    GOATCOUNTER_TOKEN=your-token python3 tools/fetch-stats.py
"""
import json, os, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

CODE = "grabclip"                      # https://grabclip.goatcounter.com
START = "2026-10-01T00:00:00Z"         # start of the all-time numbers
TOP = 8                                # countries kept per list
OUT = Path(__file__).resolve().parent.parent / "website" / "stats.json"
TOKEN = os.environ.get("GOATCOUNTER_TOKEN", "").strip()
if not TOKEN:
    sys.exit("GOATCOUNTER_TOKEN is not set. Add it as a repository secret.")

now = datetime.now(timezone.utc)
END = now.strftime("%Y-%m-%dT%H:%M:%SZ")
DAYS = 30
FROM30 = (now - timedelta(days=DAYS - 1)).strftime("%Y-%m-%dT00:00:00Z")


def api(path, **params):
    url = f"https://{CODE}.goatcounter.com/api/v0/{path}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + TOKEN, "Content-Type": "application/json"})
    time.sleep(0.5)                    # stay well under the rate limit
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"GoatCounter said {e.code} for {path}: {e.read()[:200]!r}")


# Which paths are pages and which are events (the Download click is an event)
hits = api("stats/hits", start=START, end=END, limit=100).get("hits") or []
page_ids = ",".join(str(h["path_id"]) for h in hits if not h.get("event"))
event_ids = ",".join(str(h["path_id"]) for h in hits if h.get("event") and h.get("path") == "download-click")


def total(ids, start):
    if not ids:
        return 0, []
    r = api("stats/total", start=start, end=END, include_paths=ids)
    return int(r.get("total") or 0), r.get("stats") or []


def countries(ids):
    if not ids:
        return []
    r = api("stats/locations", start=START, end=END, include_paths=ids, limit=100)
    rows = [x for x in (r.get("stats") or []) if x.get("count")]
    rows.sort(key=lambda x: -x["count"])
    return [{"c": (x.get("id") or "")[:2].upper(), "name": x.get("name") or "", "n": int(x["count"])} for x in rows]


visits, visit_days = total(page_ids, START)
downloads, _ = total(event_ids, START)
_, visit_30 = total(page_ids, FROM30)
_, dl_30 = total(event_ids, FROM30)
visit_countries = countries(page_ids)
download_countries = countries(event_ids)

v_by_day = {s["day"][:10]: int(s.get("daily") or 0) for s in visit_30}
d_by_day = {s["day"][:10]: int(s.get("daily") or 0) for s in dl_30}
days = []
for i in range(DAYS):
    d = (now - timedelta(days=DAYS - 1 - i)).strftime("%Y-%m-%d")
    days.append({"d": d, "v": v_by_day.get(d, 0), "dl": d_by_day.get(d, 0)})

first = next((s["day"][:10] for s in visit_days if s.get("daily")), None)
data = {
    "updated": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
    "since": first,
    "visits": visits,
    "downloads": downloads,
    "countries": len([c for c in visit_countries if c["c"]]),
    "last30": sum(x["v"] for x in days),
    "days": days,
    "visit_countries": [c for c in visit_countries if c["c"]][:TOP],
    "download_countries": [c for c in download_countries if c["c"]][:TOP],
}

# Only rewrite the file when a number changed, so GitHub does not redeploy for nothing
try:
    old = json.loads(OUT.read_text())
except Exception:
    old = {}
if {k: v for k, v in old.items() if k != "updated"} == {k: v for k, v in data.items() if k != "updated"}:
    print("No change.")
else:
    OUT.write_text(json.dumps(data, separators=(",", ":")) + "\n")
    print(f"Saved: {visits} visits, {downloads} download clicks, {data['countries']} countries.")
