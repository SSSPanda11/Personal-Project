# E-commerce Application Walkthrough

The E-commerce application for Bangladesh is now functionally complete (Frontend + Backend API). The application supports a full shopping flow from browsing to checkout with local payment methods.

## 🚀 Features Implemented

### 1. Core Layout & Navigation
- **Navbar**: Sticky header with Brand Logo, Search Bar, and dynamic Cart count.
- **Footer**: Standard reactive footer with copyright.
- **Responsive Shell**: Mobile-first design using Tailwind CSS.

### 2. Product Discovery
- **Hero Section**: Dynamic banner on the Home Page.
- **Search & Filter**: Real-time Search Bar and Category filters (Audio, Wearables, etc.).
- **Product Cards**: Clickable cards showing price (৳) and "Add to Cart".
- **Product Detail**:
  - **Image Gallery**: Interactive multi-image viewer.
  - **WhatsApp**: "Order on WhatsApp" direct link button.

### 3. Cart & State Management
- **React Context**: Global state for managing items, quantities, and totals.
- **Toast Notifications**: "Added to Cart" popup confirmation.
- **Persistence**: Cart items persist in `localStorage`.

### 4. Checkout Flow
- **Checkout Form**: Collecting Name, Phone, Email, and Address.
- **Validation**: Strict **11-digit** phone number check (`01xxxxxxxxx`).
- **Payment Methods**: Supports COD and MFS (bKash/Nagad/Rocket).
- **Conditional UI**: MFS fields appear only when relevant.

### 5. Backend Integration
- **API Endpoint**: `POST /api/order`.
- **Google Sheets**: **15-column** data schema for complete order logging.

## 🛠️ How to Test

1. **Browsing**:
   - Use Search Bar to find "Watch".
   - Click "Audio" category to filter.
2. **Add Items**: Click "Add to Cart". Verify the **Green Toast Popup** appears.
3. **Checkout**:
   - Go to Checkout.
   - Enter an invalid phone (e.g., `123`). Verify error message blocks submission.
   - Enter valid data (`01700000000`) and Submit.
4. **Verify Submission**:
   - Check Google Sheet for the new row.

## 📝 Configuration

> [!IMPORTANT]
> The application uses live Google Cloud credentials.
> Ensure the target Google Sheet has the correct header row corresponding to the 15 columns.
