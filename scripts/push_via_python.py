import os, subprocess

# Read the stored token from git credentials
home = os.path.expanduser("~")
creds_path = os.path.join(home, ".git-credentials")
with open(creds_path) as f:
    line = f.read().strip()

# Parse token
user = line.split("://")[1].split(":")[0]
token = line.split(":")[-1].split("@")[0]

# Set remote and push
url = f"https://{user}:***@github.com/{user}/black-archive-library-data.git"

os.chdir("/home/samuel-jah/Documents/Library")

# Remove old origin
subprocess.run(["git", "remote", "remove", "origin"], capture_output=True)
subprocess.run(["git", "remote", "add", "origin", url], capture_output=True)

print("Pushing to", user + "/black-archive-library-data ...")
result = subprocess.run(["git", "push", "-u", "origin", "main"], capture_output=True, text=True, timeout=300)
print(result.stdout[-500:] if result.stdout else "")
print(result.stderr[-500:] if result.stderr else "")
print("EXIT:", result.returncode)
