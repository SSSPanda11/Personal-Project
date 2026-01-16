# Technical QA Guide

## Code Quality Standards
- **Linting**: 0 errors allowed on `npm run lint`.
- **Types**: No `any` types in TypeScript interfaces for the Order object.
- **Clean Code**: Components should be small (< 200 lines). Business logic for Google Sheets should be separated from UI components.

## Application Checkpoints

### 1. Cart Functionality
- Adding duplicate items should increment quantity, not add duplicate rows.
- Removing the last item should clear the cart state.
- Refreshing the page should persist the cart (localStorage).

### 2. checkout Validation
- **Phone Number**: Must match BD Regex `^(?:\+88|88)?(01[3-9]\d{8})$`.
- **MFS Validation**:
  - If MFS (bKash/Nagad/Rocket) is selected, `Transaction ID` and `MFS Number` are MANDATORY.
  - If COD is selected, these fields must be hidden/disabled.

### 3. API Resilience
- **Timeout**: The API should handle cases where Google Sheets is slow to respond (set reasonable timeout).
- **Error Handling**: If Google Sheets API fails, the user should be shown a friendly "Technical Error, please try again" message, not a raw 500 stack trace.
- **Duplicate Prevention**: Simple check to prevent double-submission if the user clicks "Submit" twice rapidly (disable button on click).

## Security Checklist
- **Environment Variables**: `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` must NEVER be exposed to the client-side bundle (use `process.env` on server side only).
- **Input Sanitization**: Escape special characters before sending to Sheets to prevent "Formula Injection" (e.g., inputs starting with `=`).
