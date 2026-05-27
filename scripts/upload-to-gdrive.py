#!/usr/bin/env python3
"""
Upload ~/Documents/Library PDFs to Google Drive via service account.
Usage:
  1. Create a service account in Google Cloud Console, enable Drive API
  2. Share a Drive folder with the service account email (or delegate)
  3. Download the JSON key and set GOOGLE_APPLICATION_CREDENTIALS env var
  4. Or set GDRIVE_SERVICE_ACCOUNT_EMAIL + GDRIVE_PRIVATE_KEY env vars
  5. Run: python3 scripts/upload-to-gdrive.py [--dry-run] [--folder-id FOLDER_ID]

Delegates as samueljah1@gmail.com so files appear in that user's Drive.
"""

import os, sys, json, mimetypes, argparse
from pathlib import Path

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
except ImportError:
    print("Installing Google API client...")
    os.system(f"{sys.executable} -m pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client")
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload

LIBRARY = Path(os.path.expanduser("~/Documents/Library"))
SCOPES = ["https://www.googleapis.com/auth/drive.file"]
DELEGATE_USER = "samueljah1@gmail.com"

def get_service():
    """Authenticate using service account JSON key or env vars."""
    creds_file = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    svc_email = os.environ.get("GDRIVE_SERVICE_ACCOUNT_EMAIL")
    svc_key = os.environ.get("GDRIVE_PRIVATE_KEY")

    if svc_email and svc_key:
        creds = service_account.Credentials.from_service_account_info(
            {"type": "service_account", "project_id": "black-archive",
             "private_key": svc_key.replace("\\n", "\n"),
             "client_email": svc_email,
             "client_id": "", "auth_uri": "https://accounts.google.com/o/oauth2/auth",
             "token_uri": "https://oauth2.googleapis.com/token",
             "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
             "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{svc_email}"},
            scopes=SCOPES, subject=DELEGATE_USER)
    elif creds_file and os.path.exists(creds_file):
        creds = service_account.Credentials.from_service_account_file(creds_file, scopes=SCOPES, subject=DELEGATE_USER)
    else:
        print("❌ No Google credentials found.")
        print("   Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON key path")
        print("   OR set GDRIVE_SERVICE_ACCOUNT_EMAIL + GDRIVE_PRIVATE_KEY")
        sys.exit(1)

    return build("drive", "v3", credentials=creds)

def list_library_pdfs():
    """Get all PDFs from Library folder."""
    if not LIBRARY.exists():
        print(f"❌ Library path not found: {LIBRARY}")
        print("   Set LIBRARY_PATH or check ~/Documents/Library")
        sys.exit(1)

    pdfs = sorted(list(LIBRARY.glob("*.pdf")))
    print(f"📚 Found {len(pdfs)} PDFs in {LIBRARY}")
    return pdfs

def get_existing_files(service, folder_id=None):
    """Get files already in Drive to skip duplicates."""
    query = "trashed=false"
    if folder_id:
        query += f" and '{folder_id}' in parents"

    existing = {}
    page_token = None
    while True:
        results = service.files().list(
            q=query,
            fields="nextPageToken, files(id, name, size)",
            pageSize=200,
            pageToken=page_token,
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
        ).execute()
        for f in results.get("files", []):
            existing[f["name"]] = f
        page_token = results.get("nextPageToken")
        if not page_token:
            break
    return existing

def upload_pdf(service, pdf_path, folder_id=None, dry_run=False):
    """Upload a single PDF to Google Drive."""
    name = pdf_path.name
    size_mb = pdf_path.stat().st_size / (1024 * 1024)

    if dry_run:
        print(f"  ⏭ [DRY RUN] Would upload: {name} ({size_mb:.1f} MB)")
        return True

    media = MediaFileUpload(str(pdf_path), mimetype="application/pdf", resumable=True)
    body = {"name": name, "mimeType": "application/pdf"}
    if folder_id:
        body["parents"] = [folder_id]

    try:
        file = service.files().create(body=body, media_body=media, fields="id, name, size").execute()
        print(f"  ✓ {name} ({size_mb:.1f} MB) → ID: {file['id']}")
        return True
    except Exception as e:
        print(f"  ✗ {name}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Upload Library PDFs to Google Drive")
    parser.add_argument("--folder-id", help="Drive folder ID to upload into")
    parser.add_argument("--dry-run", action="store_true", help="Only list what would be uploaded")
    parser.add_argument("--skip-existing", action="store_true", default=True, help="Skip files already in Drive (default: yes)")
    parser.add_argument("--force", action="store_true", help="Re-upload even if file exists")
    args = parser.parse_args()

    pdfs = list_library_pdfs()
    service = get_service()

    print("☁ Checking existing files in Google Drive...")
    existing = get_existing_files(service, args.folder_id)
    print(f"   Found {len(existing)} existing files")

    uploads = []
    for pdf in pdfs:
        name = pdf.name
        if not args.force and name in existing:
            print(f"  ⏭ {name} — already exists (ID: {existing[name]['id']})")
            continue
        uploads.append(pdf)

    print(f"\n{'Would upload' if args.dry_run else 'Uploading'} {len(uploads)} files...")
    success = 0
    for pdf in uploads:
        if upload_pdf(service, pdf, args.folder_id, args.dry_run):
            success += 1

    print(f"\n{'── Done ──' if not args.dry_run else '── Dry run ──'}")
    print(f"Total: {len(pdfs)} PDFs in library")
    print(f"{'Would upload' if args.dry_run else 'Uploaded'}: {len(uploads)}")
    if not args.dry_run:
        print(f"Successful: {success}/{len(uploads)}")

if __name__ == "__main__":
    main()
