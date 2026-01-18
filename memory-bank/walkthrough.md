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
- **Google Sheets Service**: Centralized logic in `lib/googleSheets.ts`.
- **Mock Mode**: Currently logs orders to the terminal console until Google Cloud credentials are provided.

## 🛠️ How to Test

1. **Browsing**: Start at [Home Page](/).
2. **Add Items**: Click "Add to Cart" on multiple products. Verify the Navbar count updates.
3. **Cart Management**: Go to [Cart Page](/cart). Modify quantities or remove an item.
4. **Checkout**: 
   - Click "Proceed to Checkout".
   - Fill in details (Use a valid BD phone like `01712345678`).
   - Select a payment method and click "Place Order".
5. **Verify Submission**:
   - An alert will confirm the order.
   - Check your terminal console (where `npm run dev` is running) to see the full JSON payload:
     ```json
     {
       "name": "...",
       "phone": "...",
       "items": [...],
       "total": ...
     }
     ```

## 📝 Pending Actions

> [!IMPORTANT]
> To enable real Google Sheets logging:
> 1. Provide `service-account.json`.
> 2. Set environment variables in `.env.local`:
>    - `GOOGLE_SHEET_ID`
>    - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
>    - `GOOGLE_PRIVATE_KEY`
