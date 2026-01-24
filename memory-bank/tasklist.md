
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
- [x] **Data Integrity**: Verified correct 15-column format for Google Sheets
- [x] **Production Polish**: Add Meta tags, Tab Icons, and real Product Images
- [x] **UI Polish**: Added "Back" button to Product Details
- [x] **UI Polish**: Improved input field visibility and contrast on Checkout page
- [x] **Branding Update**: Update Navbar/Footer text and add Logo image.

## Phase 3: Enhancements (Completed)
- [x] **Search Feature**: Implement product search bar in Navbar.
- [x] **Categories**: Add category filtering logic and UI.
- [x] **WhatsApp Integration**: "Order on WhatsApp" button on product pages.
- [x] **UX Improvements**:
    - [x] Product Image Gallery (Support multiple images).
    - [x] Loading Skeletons for images/products.
    - [x] Hero Section (Banner) on Home Page.
    - [x] **Notification**: "Added to Cart" popup (Toast).
    - [x] **Validation**: Strict 11-digit phone number check.

## Required User Actions (Final Steps)
- [ ] **Content Update**: Replace placeholder product images with real photos in `public/products`.
- [ ] **Vercel Deployment**: Deploy the application using Vercel CLI or Dashboard.

## Phase 4: Dynamic Experience (Future Roadmap)

### 4.1 Inventory System (Google Sheets as Backend)
- [x] Connect `products` data to Google Sheets API to read inventory dynamically. (Est. 4k Tokens)
- [x] Implement Revalidation (ISR) to update cache when sheet changes. (Est. 2k Tokens)
- [x] Create `lib/inventory.ts` service for fetching stock. (Est. 2k Tokens)

### 4.2 Delivery Logic (Zone-based)
- [x] Add "District/City" dropdown to Checkout Form (e.g. Dhaka, Chittagong). (Est. 1k Tokens)
- [x] Implement shipping calculation logic (Inside Dhaka 60, Outside 120). (Est. 1k Tokens)
- [x] Update Order Summary to reflect dynamic Shipping Cost. (Est. 1k Tokens)

### 4.3 Order Tracking
- [x] Create `/track-order` page with Phone Number input. (Est. 2k Tokens)
- [x] Implement API route to query Google Sheets by Phone Number. (Est. 4k Tokens)
- [x] Display Order Status (Processing, Shipped) on UI. (Est. 2k Tokens)

### 4.4 Email Alerts (Resend)
- [ ] Set up Resend.com account and API keys. (User Action)
- [ ] Create Email Template (HTML/React Email). (Est. 3k Tokens)
- [ ] Integrate email sending into `/api/order` route. (Est. 2k Tokens)

### 4.5 Related Products
- [x] Create `RelatedProducts` component. (Est. 2k Tokens)
- [x] Implement simple recommendation algorithm (by Category). (Est. 1k Tokens)
- [x] Integrate into Product Detail page. (Est. 1k Tokens)
