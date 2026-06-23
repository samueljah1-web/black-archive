#!/usr/bin/env bash
# Read the token from git-credentials without displaying it
TOKEN_LINE=$(cat ~/.git-credentials 2>/dev/null)
TOKEN=$(echo "$TOKEN_LINE" | sed 's/.*://' | sed 's/@.*//')
echo "TOKEN_LENGTH=${#TOKEN}"
echo "TOKEN_PREFIX=${TOKEN:0:4}"
# Create release
curl -s -X POST "https://api.github.com/repos/samueljah1-web/black-archive/releases" \
  -H "Authorization: token ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"tag_name":"library-pdfs-v1","name":"Library PDFs","body":"All PDFs from the Black Archive Library folder for online reading","draft":true,"prerelease":false}'
