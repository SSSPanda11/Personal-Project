# Production Polish (SEO & Metadata)

## Goal Description
Prepare the application for public deployment by adding essential SEO metadata, proper page titles, and social sharing tags.

## Proposed Changes

### Configuration
#### [MODIFY] [app/layout.tsx](file:///d:/Project/Personal-Project/app/app/layout.tsx)
- Update global `metadata` object with proper Title and Description.
- Add `viewport` configuration.

#### [MODIFY] [app/page.tsx](file:///d:/Project/Personal-Project/app/app/page.tsx)
- Add page-specific metadata for the home page.

#### [MODIFY] [app/cart/page.tsx](file:///d:/Project/Personal-Project/app/app/cart/page.tsx)
- Add page-specific metadata.

#### [MODIFY] [app/checkout/page.tsx](file:///d:/Project/Personal-Project/app/app/checkout/page.tsx)
- Add page-specific metadata.

### Assets
- **Favicon**: Prepare for favicon addition (placeholder or standard).

## Verification Plan

### Manual Verification
1. Check browser tabs for correct titles on each page.
2. Inspect HTML source for meta description and OpenGraph tags.
