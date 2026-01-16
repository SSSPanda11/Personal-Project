# Task List

## Documentation & Planning
- [x] Create Project Brief
- [ ] Create Tech Context
- [ ] Create Test Plan
- [ ] Create Deployment Guide

## Setup & configuration
- [ ] Initialize Next.js Project with Tailwind CSS
- [ ] Configure ESLint/Prettier
- [ ] Set up Google Cloud Console Project for Sheets API
- [ ] Generate Service Account Credentials (user action required)

## Frontend Development
- [ ] **Core Layout**: Navbar, Footer, Mobile Responsive Shell
- [ ] **Product Listing**: Grid view of products with images/prices
- [ ] **Product Detail**: Individual page with Description and "Add to Cart"
- [ ] **Cart State**: Context/Redux for managing cart items
- [ ] **Cart UI**: Slide-out or dedicated page for cart review
- [ ] **Checkout Form**:
    - Personal Info (Name, Phone, Email)
    - Address Info
    - Payment Method Selector (COD/MFS)
    - MFS Input Fields (Conditionals: displays only if MFS is picked)

## Backend / API (Next.js API Routes)
- [ ] `POST /api/order`: Endpoint to receive order data
- [ ] **Google Sheets Service**: Helper class/function to authenticate and append rows
- [ ] Validation Logic: Verify phone numbers (Regex) and required fields

## Integration
- [ ] Connect Checkout Form to `/api/order`
- [ ] Handle Loading/Success/Error states during order submission
- [ ] Show Success Confirmation Screen

## Testing
- [ ] functional test: Add to cart -> Checkout -> Sheet Update
- [ ] Mobile Responsiveness check
