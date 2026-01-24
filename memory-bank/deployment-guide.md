# Deployment Guide

## 1. Prerequisites
- **GitHub Account**: To host the repository.
- **Vercel Account**: To deploy the application (free tier is sufficient).
- **Google Cloud Console**: For the Service Account (Credentials).

## 2. Environment Variables
You need to set these in Vercel's "Environment Variables" section:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

> **Note**: The `GOOGLE_PRIVATE_KEY` must include the `\n` line breaks. If pasting into Vercel UI, you might need to preserve formatting.

## 3. Deployment Steps
1.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Ready for deploy"
    git push origin main
    ```
2.  **Connect to Vercel**:
    - Go to Vercel Dashboard -> "New Project".
    - Import your GitHub repository.
3.  **Configure**:
    - Framework Preset: **Next.js**.
    - Root Directory: `app` (Since your code is inside the `app` folder).
4.  **Deploy**: Click "Deploy".

## 4. Post-Deployment
- **Domain**: Vercel will give you a domain like `shopbd.vercel.app`.
- **Testing**: Place a real order to verify the Google Sheet connection works in production.

## 5. Troubleshooting
- **500 Error on Order**: Usually means `GOOGLE_PRIVATE_KEY` is formatted incorrectly.
- **Images not loading**: Ensure images are in `public/products/` and committed to Git.
