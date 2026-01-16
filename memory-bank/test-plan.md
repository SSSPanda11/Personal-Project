# Test Plan

## Scope
Verification of the critical "Purchase Flow": from Product Selection -> Cart -> Checkout -> Google Sheets Verification.

## Test Cases

### TC-01: Happy Path - Cash on Delivery
1. Open Home Page.
2. Click "Add to Cart" on a product.
3. Open Cart. Verify item is there.
4. Click "Checkout".
5. Fill details: Name: "Test User", Phone: "01700000000", Address: "Dhaka".
6. Select Payment: **Cash on Delivery**.
7. Submit Order.
8. **Expected**: Success message shown.
9. **Verify**: Check Google Sheet. New row should exist with Status="COD" and empty Trx ID.

### TC-02: Happy Path - bKash Payment
1. Open Home Page -> Add to Cart -> Checkout.
2. Fill details.
3. Select Payment: **bKash**.
4. **Expected**: Fields for "bKash Number" and "Transaction ID" appear.
5. Fill MFS Number: "01700000000", TrxID: "ABC123XYZ".
6. Submit Order.
7. **Expected**: Success message shown.
8. **Verify**: Check Google Sheet. New row should exist with Method="bKash", TrxID="ABC123XYZ".

### TC-03: Validation - Missing Fields
1. Go to Checkout.
2. Leave "Phone Number" empty.
3. Submit.
4. **Expected**: Error message "Phone number is required". Form does not submit.

### TC-04: Persistency
1. Add items to cart.
2. Reload page.
3. **Expected**: Items remain in cart.

### TC-05: Mobile Responsiveness
1. Open browser DevTools (F12).
2. Switch to Mobile View (iPhone 12/Pixel 5).
3. **Expected**: All forms are readable, no horizontal scroll, buttons are clickable.
