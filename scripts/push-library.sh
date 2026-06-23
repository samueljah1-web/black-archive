#!/bin/bash
set -e

# Read credentials
CRED=$(cat ~/.git-credentials)
USER=$(echo "$CRED" | sed 's|https://||' | sed 's/:.*//')
TOKEN=$(echo "$CRED" | sed 's|.*:||' | sed 's|@.*||')

if [ -z "$TOKEN" ]; then
  echo "Failed to read token"
  exit 1
fi

LIB_DIR="/home/samuel-jah/Documents/Library"

cd "$LIB_DIR"
rm -rf .git 2>/dev/null
git init
git config user.email "samueljah1@gmail.com"
git config user.name "Samuel Jah"
git config core.bigFileThreshold 10m
git branch -m main

echo "Adding PDFs..."
git add -A
echo "Committing..."
git commit -m "Add all Library PDFs"

echo "Creating GitHub repo..."
curl -s -X POST "https://api.github.com/user/repos" \
  -H "Authorization: token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"black-archive-library-data","description":"PDF library for Black Archive app","private":false,"auto_init":false}' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('clone_url','ERR: '+str(d)))"

REMOTE_URL="https://$USER:$TOKEN@github.com/$USER/black-archive-library-data.git"
git remote add origin "$REMOTE_URL"
echo "Pushing PDFs to GitHub (2GB)..."
git push -u origin main 2>&1 | tail -10

echo "Done! https://github.com/$USER/black-archive-library-data"
