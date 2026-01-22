
# Task List

## Documentation & Planning
- [x] Create Project Brief
- [x] Create Tech Context
- [x] Create Test Plan
- [x] Create Deployment Guide

## Setup & configuration
- [x] Initialize Next.js Project with Tailwind CSS
- [x] Configure ESLint/Prettier
- [x] Set up Google Cloud Console Project for Sheets API
- [x] Generate Service Account Credentials (user action required)

## Frontend Development
- [x] **Core Layout**: Navbar, Footer, Mobile Responsive Shell
- [x] **Product Listing**: Grid view of products with images/prices
- [x] **Product Detail**: Individual page with Description and "Add to Cart"
- [x] **Cart State**: Context/Redux for managing cart items
- [x] **Cart UI**: Slide-out or dedicated page for cart review
- [x] **Checkout Form**:
    - Personal Info (Name, Phone, Email)
    - Address Info
    - Payment Method Selector (COD/MFS)
    - MFS Input Fields (Conditionals: displays only if MFS is picked)

## Backend / API (Next.js API Routes)
- [x] `POST /api/order`: Endpoint to receive order data
- [x] **Google Sheets Service**: Helper class/function to authenticate and append rows
- [x] Validation Logic: Verify phone numbers (Regex) and required fields

## Integration
- [x] Connect Checkout Form to `/api/order`
- [x] Handle Loading/Success/Error states during order submission
- [x] Show Success Confirmation Screen

## Phase 2: Refinement & Live Deploy
- [x] **Order Success Page**: Dedicated `/success` page with order confirmation
- [x] **Clear Cart Logic**: Hook to clear cart after successful order
- [x] **Google Sheets Live**: Connect valid credentials and verify live updates
- [ ] **Vercel Deployment**: Deploy the application to Vercel
- [x] **Production Polish**: Add Meta tags, Tab Icons, and real Product Images
- [x] **UI Polish**: Added "Back" button to Product Details
- [x] **UI Polish**: Improved input field visibility and contrast on Checkout page
