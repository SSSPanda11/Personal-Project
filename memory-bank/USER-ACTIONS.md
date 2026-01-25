# 🚀 User Action Checklist - Deployment Ready

This document outlines all the steps YOU need to complete to take your e-commerce platform live.

---

## ✅ Pre-Deployment Setup

### 1. Google Sheets Configuration (Required)

#### A. Orders Sheet (Already exists)
Your current Google Sheet should have **18 columns**:
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
16. District
17. Delivery Fee
18. Status

**Action**: Verify your sheet has these 18 column headers in Row 1.

#### B. Products Sheet (New - Required for Dynamic Inventory)
Create a new tab named **"Products"** with these columns:


| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Name | Price | Description | Image | Category | Image2 | Image3 |

**Example Row**:
```
1 | Premium Headphones | 3500 | High-quality wireless headphones | https://example.com/img1.jpg | Audio | https://example.com/img2.jpg | https://example.com/img3.jpg
```

**Action**: 
1. Create "Products" tab in your Google Sheet
2. Add the 8 column headers
3. Add your product data (or keep using static data from code)

---

### 2. Product Images (Optional but Recommended)

**Current State**: Using placeholder images from placehold.co

**Action**:
1. Create folder: `app/public/products/`
2. Upload your product images (JPG/PNG format)
3. Update `app/data/products.ts` to reference your images:
   ```typescript
   image: '/products/headphones-main.jpg',
   images: [
       '/products/headphones-front.jpg',
       '/products/headphones-side.jpg',
       '/products/headphones-case.jpg'
   ]
   ```

---

### 3. Resend Email Setup (Optional - for Email Notifications)

**Action**:
1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your domain (or use their test domain for testing)
3. Generate an API key from the dashboard
4. Note down:
   - `RESEND_API_KEY`: Your API key
   - `RESEND_FROM_EMAIL`: Email address to send from (e.g., orders@yourdomain.com)
   - `ADMIN_EMAIL`: Your email to receive order notifications

**Skip this if**: You don't want email notifications (orders will still work fine)

---

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
cd d:\Project\Personal-Project\app
git add .
git commit -m "Ready for production deployment"
git push origin main
```

---

### Step 2: Deploy to Vercel

1. **Go to**: [vercel.com](https://vercel.com)
2. **Sign in** with your GitHub account
3. **Click**: "New Project"
4. **Import** your repository
5. **Configure**:
   - Framework Preset: **Next.js**
   - Root Directory: **`app`** (Important!)
   - Build Command: `npm run build`
   - Output Directory: `.next`

---

### Step 3: Add Environment Variables

In Vercel's project settings → Environment Variables, add:

#### Required Variables:
```env
GOOGLE_SHEET_ID=your_actual_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nActual\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**How to get these**:
- `GOOGLE_SHEET_ID`: From your Google Sheet URL (the long string between `/d/` and `/edit`)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: From your Google Cloud Console → Service Accounts
- `GOOGLE_PRIVATE_KEY`: From the JSON file you downloaded when creating the service account

#### Optional Variables (for Email):
```env
RESEND_API_KEY=re_your_api_key_from_resend
RESEND_FROM_EMAIL=orders@yourdomain.com
ADMIN_EMAIL=your-email@example.com
```

---

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

---

## 🧪 Post-Deployment Testing

### Test Checklist:

- [ ] Visit your Vercel URL
- [ ] Browse products
- [ ] Add items to cart
- [ ] Go to checkout
- [ ] Fill in the form with test data
- [ ] Place an order
- [ ] **Verify**: New row appears in Google Sheets
- [ ] **Verify**: Email received (if configured)
- [ ] Test order tracking at `/track-order`
- [ ] Test search functionality
- [ ] Test category filters

---

## 🎨 Branding Customization (Optional)

### Update Brand Name:
1. Open `app/components/Navbar.tsx`
2. Change "ShopBD" to your brand name
3. Open `app/components/Footer.tsx`
4. Update copyright text

### Add Logo:
1. Place logo in `app/public/logo.png`
2. Update Navbar to use: `<Image src="/logo.png" ... />`

---

## 📱 WhatsApp Number Update

**Current**: Using placeholder `8801700000000`

**Action**:
1. Open `app/app/product/[id]/page.tsx`
2. Find line 73: `https://wa.me/8801700000000`
3. Replace with your actual WhatsApp number (format: country code + number, no spaces)
   - Example: `https://wa.me/8801712345678`

---

## 🔒 Security Checklist

- [ ] Never commit `.env.local` to Git
- [ ] Keep your Google Service Account JSON file secure
- [ ] Don't share your Resend API key
- [ ] Enable 2FA on Vercel account
- [ ] Regularly rotate API keys

---

## 📊 Monitoring & Maintenance

### After Launch:

1. **Monitor Orders**: Check your Google Sheet regularly
2. **Update Inventory**: Edit the "Products" sheet to change prices/stock
3. **Order Status**: Update the "Status" column in Orders sheet (Pending → Processing → Shipped)
4. **Analytics**: Add Google Analytics or Vercel Analytics (optional)

---

## 🆘 Troubleshooting

### Common Issues:

**Orders not appearing in Google Sheets**:
- Check environment variables are correct
- Verify service account has "Editor" access to the sheet
- Check Vercel deployment logs for errors

**Images not loading**:
- Ensure images are in `public/` folder
- Verify file names match exactly (case-sensitive)
- Check images are committed to Git

**Email not sending**:
- Verify Resend API key is correct
- Check "from" email is verified in Resend
- Look at Vercel function logs

**Build fails**:
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

---

## 📞 Need Help?

Refer to these files in your project:
- `memory-bank/deployment-guide.md` - Detailed deployment steps
- `memory-bank/test-plan.md` - Testing scenarios
- `memory-bank/walkthrough.md` - Feature overview

---

## ✨ Summary

**Minimum Required Actions**:
1. ✅ Verify Google Sheets has 18 columns
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel
4. ✅ Add environment variables
5. ✅ Test one order end-to-end

**Optional Enhancements**:
- Upload real product images
- Create Products sheet for dynamic inventory
- Setup Resend for email notifications
- Customize branding

**Total Time Estimate**: 30-60 minutes

---

Good luck with your launch! 🚀
