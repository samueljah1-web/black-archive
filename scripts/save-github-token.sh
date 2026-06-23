#!/usr/bin/env bash
# Run this once to store your GitHub token for The Black Archive
# Usage: bash scripts/save-github-token.sh
# Then paste your token when prompted

set -e

echo "Setting up GitHub credentials for The Black Archive..."
echo "Paste your GitHub personal access token (ghp_...) and press Enter:"
read -s TOKEN
echo

if [ -z "$TOKEN" ]; then
    echo "No token entered. Aborting."
    exit 1
fi

# Store the credential
echo "https://samueljah1-web:${TOKEN}@github.com" >> ~/.git-credentials

# Set credential helper globally
git config --global credential.helper store

echo "✅ Token stored. You can now push with just: git push"
echo "   (No more username/password prompts!)"
