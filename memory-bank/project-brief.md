# Project Brief

## 1. Problem Statement
The goal is to build a real-world E-commerce web application tailored for consumers in Bangladesh. The application must simplify the shopping process, offering browsing, cart management, and a streamlined checkout experience that accommodates local payment habits (Cash on Delivery and Mobile Financial Services) while centralizing order management in Google Sheets.

## 2. Target Users
- **Consumers in Bangladesh**: Users who want to browse and purchase products online using local payment methods.

## 3. Core Functional Requirements
- **Product Browsing**: Users can view a list of products.
- **Product Details**: Users can click a product to view its specific details.
- **Cart Management**:
  - Add products to the shopping cart.
  - Review cart contents.
- **Checkout Process**:
  - Input Personal Information.
  - Input Delivery Details.
  - Select Payment Method.

## 4. Payment Flow Overview
### Option 1: Cash on Delivery (COD)
- User selects **Cash on Delivery**.
- User completes the checkout process without immediate payment.

### Option 2: Mobile Financial Services (MFS)
- **Supported Providers**: bKash, Nagad, Rocket.
- **Workflow**:
  1. User selects the specific MFS provider (e.g., bKash).
  2. User is redirected to the selected specific payment gateway.
  3. User completes the payment transaction.
  4. User returns and submits the following payment verification details:
     - **MFS Number**
     - **Transaction ID**

## 5. Order Data Requirements
Upon order confirmation, all data must be automatically stored in a Google Sheet with the following **mandatory columns**:

1. Order ID
2. Date
3. Time
4. Customer Name
5. Customer Phone Number
6. Email
7. Payment Method
8. MFS Provider Name (bKash/Nagad/Rocket)
9. MFS Number
10. Transaction ID
11. Ordered Items
12. Quantity
13. Delivery Address
14. Receiver Name
15. Receiver Phone Number

## 6. Success Criteria
- Users can successfully browse, add to cart, and checkout.
- Order details are accurately and instantly populated in the designated Google Sheet.
- MFS payments record the user-submitted MFS Number and Transaction ID.
- Application supports both COD and MFS flows seamlessly.
- **UI/UX Excellence**:
  - High contrast input fields for clear visibility.
  - Intuitive navigation with dedicated "Back" button on product pages.
  - Responsive design optimized for mobile users in Bangladesh.

## 7. Explicit Non-Goals
- **Inventory Management**: Real-time stock tracking is not currently in scope.
- **User Authentication**: User accounts/login are not a requirement (Guest checkout focus).
