#!/bin/bash
# Use the stored git credentials for the new repo
cd /home/samuel-jah/Documents/Library || exit 1
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/samueljah1-web/black-archive-library-data.git"

# Apply the same credentials stored for black-archive repo
cat ~/.git-credentials >> ~/.git-credentials 2>/dev/null
# Actually just set credentials manually from the stored line
CRED_LINE=$(cat ~/.git-credentials | head -1)
echo "$CRED_LINE" | sed "s|github.com|github.com/samueljah1-web/black-archive-library-data.git|" >> ~/.git-credentials

git push -u origin main 2>&1 | tail -10
echo "DONE exit=$?"
