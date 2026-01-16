# Deployment Guide

## Prerequisites
1. **GitHub Repository**: Code must be pushed to a Git repo.
2. **Vercel Account**: For hosting (free tier is sufficient).
3. **Google Cloud Service Account**: Valid `credentials.json` with editor access to the target Sheet.

## Steps

### 1. Build & Push
1. Ensure `npm run build` succeeds locally.
2. Push code to `main` branch.

### 2. Configure Vercel
1. Import project in Vercel.
2. Select Framework "Next.js".
3. **Environment Variables**: Add the following secrets in Vercel Dashboard:
    - `GOOGLE_SHEET_ID`: The ID from your Google Sheet URL.
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: From JSON key.
    - `GOOGLE_PRIVATE_KEY`: From JSON key (Handling newlines might be strict).

### 3. Deploy
1. Click "Deploy".
2. Wait for build to complete.
3. Visit the provided `.vercel.app` URL.

### 4. Post-Deployment Logic
1. Perform a test order on the live URL.
2. Check Google Sheet to confirm data is arriving.
