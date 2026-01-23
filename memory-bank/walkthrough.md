# E-commerce Application Walkthrough

The E-commerce application for Bangladesh is now functionally complete (Frontend + Backend API). The application supports a full shopping flow from browsing to checkout with local payment methods.

## 🚀 Features Implemented

### 1. Core Layout & Navigation
- **Navbar**: Sticky header with brand logo and dynamic cart item count.
- **Footer**: Standard reactive footer.
- **Responsive Shell**: Mobile-first design using Tailwind CSS.

### 2. Product Discovery
- **Home Page**: Responsive grid displaying featured products (mock data).
- **Product Cards**: Clickable cards showing price (৳) and "Add to Cart" button.
- **Product Detail**: Dynamic route `/product/[id]` showing full details and high-resolution images.

### 3. Cart & State Management
- **React Context**: Global state for managing items, quantities, and totals.
- **Persistence**: Cart items persist in `localStorage` across page refreshes.
- **Dedicated Cart Page**: View items, update quantities, or remove products at `/cart`.

### 4. Checkout Flow
- **Checkout Form**: Collecting Name, Phone (BD format validation), Email, and Address.
- **Payment Methods**: Supports Cash on Delivery (COD) and MFS (bKash, Nagad, Rocket).
- **Conditional UI**: Shows MFS Number and Transaction ID fields only when an MFS method is selected.

### 5. Backend Integration
- **API Endpoint**: `POST /api/order` handles order processing.
- **Google Sheets Service**: Centralized logic in `lib/googleSheets.ts` connecting to the live sheet.
- **Data Format**: Orders are appended as a 15-column row matching the user's specific requirement:
  1. Order ID
  2. Date
  3. Time
  4. Customer Name
  5. Customer Phone Number
  6. Email
  7. Payment Method
  8. MFS Provider Name
  9. MFS Number
  10. Transaction ID
  11. Ordered Items
  12. Quantity
  13. Delivery Address
  14. Receiver Name
  15. Receiver Phone Number

## 🛠️ How to Test

1. **Browsing**: Start at [Home Page](/).
2. **Add Items**: Click "Add to Cart" on multiple products. Verify the Navbar count updates.
3. **Cart Management**: Go to [Cart Page](/cart). Modify quantities or remove an item.
4. **Checkout**: 
   - Click "Proceed to Checkout".
   - Fill in details (Use a valid BD phone like `01712345678`).
   - Select a payment method and click "Place Order".
5. **Verify Submission**:
   - You will be redirected to the `/success` page.
   - **Check the Google Sheet**: Verify that a new row has appeared with all 15 columns correctly filled.

## 📝 Configuration

> [!IMPORTANT]
> The application is currently configured with live Google Cloud credentials.
> Ensure the target Google Sheet has the correct header row corresponding to the 15 columns listed above.
