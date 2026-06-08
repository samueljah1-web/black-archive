#!/usr/bin/env python3
"""Push The Black Archive to GitHub in one command."""
import json, os, subprocess, sys

REPO = "/home/samuel-jah/Documents/TheBlackArchive"

# Get fresh token from device flow
os.system("""
curl -s -X POST https://github.com/login/device/code \
  -H "Accept: application/json" \
  -d "client_id=178c6fc778ccc68e1d6a&scope=repo" > /tmp/gh_push_device.json
""")

with open("/tmp/gh_push_device.json") as f:
    data = json.load(f)

print(f"\n1️⃣ Go to: https://github.com/login/device")
print(f"2️⃣ Enter code: {data['user_code']}")
print(f"\nPress Enter once you've done that...")

input()

# Poll for token
device_code = data["device_code"]
for _ in range(60):
    r = subprocess.run([
        "curl", "-s", "-X", "POST", "https://github.com/login/oauth/access_token",
        "-H", "Accept: application/json",
        "-d", f"client_id=178c6fc778ccc68e1d6a&device_code={device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code"
    ], capture_output=True, text=True)
    d = json.loads(r.stdout)
    if "access_token" in d:
        token = d["access_token"]
        break
    import time
    time.sleep(5)
else:
    print("Timed out")
    sys.exit(1)

# Use token for git push
os.chdir(REPO)
subprocess.run(["git", "credential", "approve"], 
    input=f"protocol=https\nhost=github.com\nusername=token\npassword={token}\n\n",
    text=True)
result = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
if result.returncode == 0:
    print("\n✅ PUSHED SUCCESSFULLY!")
else:
    print(f"\n❌ Push failed. Error: {result.stderr}")
