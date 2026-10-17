"""Fetch Waite's public-domain card meanings for editorial comparison."""

from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "https://www.openathenaeum.org/deck/"
OUT = Path(__file__).with_name("waite-reference.json")


def fetch(url):
    response = requests.get(url, timeout=20)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    heading = next(h for h in soup.find_all("h2") if h.get_text(" ", strip=True) == "In divination")
    parts = []
    for sibling in heading.next_siblings:
        if getattr(sibling, "name", None) == "h2":
            break
        if getattr(sibling, "name", None) == "p":
            parts.append(sibling.get_text(" ", strip=True))
    return {"name": soup.title.get_text(" ", strip=True).split(" · ")[0], "url": url, "meanings": parts}


index = BeautifulSoup(requests.get(BASE, timeout=20).text, "html.parser")
links = [urljoin(BASE, a["href"]) for a in index.select('a[href^="/deck/"]') if a["href"] != "/deck/"]
links = list(dict.fromkeys(links))
with ThreadPoolExecutor(max_workers=8) as pool:
    entries = list(pool.map(fetch, links))
OUT.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Fetched {len(entries)} card entries to {OUT}")
