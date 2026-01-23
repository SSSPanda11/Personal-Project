# Active Context

## Current Focus
- Finalizing Phase 3 Enhancements.
- Preparing for Vercel Deployment.

## Recent Changes
- **Phase 3 Features**: Implemented Search, Category Filters, WhatsApp Button, Hero Section, and Loading Skeletons.
- **UX Refinements**:
  - Added `Toast` notification for "Add to Cart" action.
  - Enforced strict 11-digit Phone Number validation in Checkout.
- **System Health**: Passed full `npm run build` check.

## Active Decisions
- **Architecture**: **Next.js** (App Router) + **Tailwind CSS**.
- **Database**: **Google Sheets** (via Service Account).
- **Payment Handling**: Manual verification for MFS (bKash/Nagad/Rocket).
- **Data Format**: Fixed to 15 columns.
- **Validation**: Strict 11-digit phone number requirement (`^01\d{9}$`).

## Next Steps
1. Final manual test verification.
2. Deploy to Vercel.
3. User to upload real product photos.
