# Project Brief: E-commerce Web Application for Bangladesh

## 1. Problem Statement
There is a need for a localized, user-friendly e-commerce platform tailored for consumers in Bangladesh that significantly simplifies the checkout and order management process. The system needs to accommodate local payment preferences (Cash on Delivery and Mobile Financial Services) and provide a streamlined, low-overhead backend solution using Google Sheets for order tracking.

## 2. Target Users
- **Primary**: Consumers in Bangladesh looking to purchase products online.
- **Secondary**: Administrators/Shop owners who will manage orders via Google Sheets.

## 3. Core Features
- **Product Catalog**: Users can browse available products.
- **Product Details**: Users can view detailed information for a selected product.
- **Shopping Cart**: Ability to add products to a cart and review them.
- **Checkout System**:
  - Collection of Personal Information (Name, Phone, Email).
  - Collection of Delivery Details (Address, Receiver Info).
- **Payment Method Selection**:
  - Cash on Delivery (COD).
  - Mobile Financial Services (bKash, Nagad, Rocket).
- **Order Processing**:
  - Automated data entry into Google Sheets upon order confirmation.

## 4. Payment Flow Overview
### Scenario A: Cash on Delivery (COD)
1. User selects "Cash on Delivery" at checkout.
2. User confirms the order.
3. System records the order with status "Pending Payment/COD".

### Scenario B: Mobile Financial Services (MFS)
1. User selects MFS provider (bKash, Nagad, or Rocket).
2. System displays the merchant/receiving number and instructions.
3. User performs the transaction on their device.
4. User enters the following verification details in the application:
   - MFS Number used for payment.
   - Transaction ID.
5. User submits the order.
6. System records the order with payment details.

## 5. Data Storage Requirements
All order data must be automatically synced to a Google Sheet.

**Mandatory Fields:**
1. Order ID
2. Date
3. Time
4. Customer Name
5. Customer Phone Number
6. Email
7. Payment Method (COD / MFS)
8. MFS Provider Name (if applicable)
9. MFS Number (if applicable)
10. Transaction ID (if applicable)
11. Ordered Items (List/String)
12. Quantity
13. Delivery Address
14. Receiver Name
15. Receiver Phone Number

## 6. Success Criteria
- Users can successfully complete a purchase flow using both COD and MFS.
- MFS payments accurately capture the user-provided Transaction ID and Phone Number.
- All confirmed orders appear immediately and accurately in the designated Google Sheet.
- The application is responsive and accessible on mobile devices (crucial for the target market).

## 7. Non-Goals
- **Complex Inventory Management**: Real-time stock decrementing is not a primary requirement for the MVP (unless otherwise specified).
- **User Authentication**: Mandatory account creation is not a requirement; guest checkout is the priority.
- **Automated Payment Verification**: Integration with standard MFS APIs for automatic verification is not in scope for version 1 (manual entry of Trx ID is used).

## 8. Improvement Suggestions

### Usability
- **Phone Number Validation**: Implement local regex validation for Bangladeshi phone numbers (`+880` or `01xxx`) to reduce delivery errors.
- **MFS Instruction Clarity**: Include clear, copy-pasteable numbers and visual guides for how to find the Transaction ID for each MFS provider.
- **Address Selector**: Use a dropdown for District/Thana to standardize delivery locations for easier logistics.

### Security
- **Input Sanitization**: Strictly sanitize all inputs before sending to Google Sheets to prevent injection attacks or sheet corruption.
- **Rate Limiting**: Prevent spam orders by rate-limiting the checkout endpoint.
- **PII Protection**: Ensure customer data is handled securely during transit (HTTPS).

### Scalability & Reliability
- **Google Sheets API Limits**: The Google Sheets API has rate limits. Usage of a queue system or a robust retry mechanism is recommended to handle concurrent orders.
- **Backup Storage**: Consider a secondary log (local JSON or simple DB) in case the Google Sheets connection fails, to ensure no orders are lost.

### Architecture (To Be Discussed)
- **Frontend**: React.js or Next.js for a snappy, app-like experience?
- **Backend**: Node.js/Express generic backend to handle the sheet integration securely, masking API keys?
