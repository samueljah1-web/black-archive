#!/usr/bin/env python3
"""Upload Library PDFs to GitHub Release for online access."""
import os
import sys
import json
import urllib.request
import urllib.error
import mimetypes
import time

LIBRARY = "/home/samuel-jah/Documents/Library"
OWNER = "samueljah1-web"
REPO = "black-archive"

def get_token():
    creds_file = os.path.expanduser("~/.git-credentials")
    with open(creds_file) as f:
        line = f.read().strip()
    return line.split(":")[-1].split("@")[0]

def api(method, path, data=None, headers_extra=None):
    token = get_token()
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/{path}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    if headers_extra:
        headers.update(headers_extra)
    body = json.dumps(data).encode() if data else None
    if data:
        headers["Content-Type"] = "application/json"
    
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  API error {e.code}: {e.read().decode()[:200]}")
        return None

def upload_asset(release_id, filepath):
    token = get_token()
    filename = os.path.basename(filepath)
    url = f"https://uploads.github.com/repos/{OWNER}/{REPO}/releases/{release_id}/assets?name={urllib.parse.quote(filename)}"
    
    filesize = os.path.getsize(filepath)
    print(f"  Uploading {filename} ({filesize / 1024 / 1024:.1f} MB)...")
    
    with open(filepath, "rb") as f:
        data = f.read()
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"token {token}")
    req.add_header("Content-Type", mimetypes.guess_type(filename)[0] or "application/octet-stream")
    req.add_header("Content-Length", str(len(data)))
    
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            print(f"    ✓ {filename} -> {result.get('browser_download_url', 'OK')}")
            return result.get("browser_download_url")
    except urllib.error.HTTPError as e:
        print(f"    ✗ {filename}: HTTP {e.code}")
        return None

def main():
    print("Creating GitHub release...")
    release = api("POST", "releases", {
        "tag_name": "library-pdfs-v1",
        "name": "Black Archive Library PDFs",
        "body": "All 236 PDFs from the Library folder for inline reading in the Black Archive app.",
        "draft": False,
        "prerelease": False,
    })
    if not release:
        print("Failed to create release. Aborting.")
        return 1
    
    release_id = release["id"]
    print(f"Release created: {release['html_url']} (id={release_id})")
    
    # Get PDF files
    pdfs = sorted([f for f in os.listdir(LIBRARY) if f.lower().endswith('.pdf')])
    print(f"Found {len(pdfs)} PDFs ({sum(os.path.getsize(os.path.join(LIBRARY,p)) for p in pdfs)/1024/1024/1024:.1f} GB)")
    
    # Upload in batches of 5
    batch_size = 5
    for i in range(0, len(pdfs), batch_size):
        batch = pdfs[i:i+batch_size]
        for pdf in batch:
            filepath = os.path.join(LIBRARY, pdf)
            upload_asset(release_id, filepath)
            time.sleep(0.5)  # Rate limiting
    
    print("\nDone! All PDFs uploaded.")

if __name__ == "__main__":
    import urllib.parse
    sys.exit(main())
