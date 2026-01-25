# Products Sheet Setup Guide

## ✅ Status: Sheet Created!

You've successfully created the **Products** sheet in your Google Sheets. Here's what to do next:

---

## 📊 Current Sheet Structure

Your Products sheet should have these **8 columns**:

| Column | Header | Data Type | Example |
|--------|--------|-----------|---------|
| A | ID | Number | 1 |
| B | Name | Text | Premium Headphones |
| C | Price | Number | 3500 |
| D | Description | Text | High-quality wireless headphones with noise cancellation |
| E | Image | URL | https://placehold.co/600x400 |
| F | Category | Text | Audio |
| G | Image2 | URL | https://placehold.co/600x400 |
| H | Image3 | URL | https://placehold.co/600x400 |

---

## 🔄 How It Works

The application will:
1. **Read** product data from this sheet every time someone visits your site
2. **Cache** the data for 60 seconds (to avoid hitting API limits)
3. **Display** products dynamically on your homepage and product pages

**Code Location**: `app/lib/inventory.ts` handles fetching products from this sheet.

---

## 📝 Populating Your Products

### Option 1: Add Products Manually

Add rows to your Products sheet like this:

```
Row 2: 1 | Premium Headphones | 3500 | High-quality wireless... | https://... | Audio | https://... | https://...
Row 3: 2 | Smart Watch | 8500 | Fitness tracking... | https://... | Wearables | https://... | https://...
Row 4: 3 | Bluetooth Speaker | 2500 | Portable speaker... | https://... | Audio | https://... | https://...
```

### Option 2: Copy Existing Products

You can copy data from `app/data/products.ts` to get started:

**Current Static Products** (in your code):
- Premium Headphones (ID: 1)
- Smart Watch (ID: 2)
- Bluetooth Speaker (ID: 3)
- Wireless Earbuds (ID: 4)
- Fitness Tracker (ID: 5)
- Portable Charger (ID: 6)

---

## 🖼️ Image URLs

### For Now (Testing):
Use placeholder images:
```
https://placehold.co/600x400/png?text=Product+Name
```

### For Production:
You have 3 options:

**Option A: Upload to Google Drive**
1. Upload images to Google Drive
2. Make them publicly accessible
3. Use the direct link in your sheet

**Option B: Use Imgur or Image Hosting**
1. Upload to imgur.com
2. Copy the direct image URL
3. Paste in your sheet

**Option C: Use Local Images (Recommended)**
1. Place images in `app/public/products/`
2. Use relative URLs: `/products/headphones.jpg`
3. Deploy to Vercel (images will be hosted automatically)

---

## 🔗 Connecting to Your App

### Step 1: Verify Sheet Name
Make sure your sheet tab is named exactly: **"Products"** (case-sensitive)

### Step 2: Grant Access
Your Google Service Account needs access:
1. In Google Sheets, click **Share**
2. Add your service account email: `your-service-account@project.iam.gserviceaccount.com`
3. Give **Viewer** access (read-only is enough)

### Step 3: Test Locally

Run your app locally to test:

```bash
cd d:\Project\Personal-Project\app
npm run dev
```

Visit `http://localhost:3000` and check if products load from the sheet.

---

## 🧪 Testing the Integration

### Test Checklist:

1. **Add a test product** to your Products sheet:
   ```
   99 | Test Product | 100 | This is a test | https://placehold.co/400 | Test | | 
   ```

2. **Refresh your local app** (wait 60 seconds for cache to clear, or restart the dev server)

3. **Check if "Test Product" appears** on your homepage

4. **Remove the test product** from the sheet

5. **Refresh again** - it should disappear

---

## 🚨 Troubleshooting

### Products not showing up?

**Check 1: Service Account Access**
- Go to your Google Sheet
- Click Share → verify service account email is listed

**Check 2: Sheet Name**
- Tab must be named exactly "Products" (capital P)

**Check 3: Environment Variables**
- Verify `GOOGLE_SHEET_ID` in `.env.local`
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Verify `GOOGLE_PRIVATE_KEY`

**Check 4: Console Errors**
- Open browser DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed API calls

**Check 5: API Route**
- Visit: `http://localhost:3000/api/products`
- Should return JSON array of products
- If error, check the error message

---

## 📈 Next Steps

Now that your Products sheet is set up:

### Immediate Actions:
1. ✅ **Populate the sheet** with your actual products
2. ✅ **Test locally** to verify products load correctly
3. ⏳ **Upload product images** (optional but recommended)
4. ⏳ **Deploy to Vercel** (see `deployment-guide.md`)

### Optional Enhancements:
- Add more product details (brand, SKU, stock quantity)
- Create multiple categories
- Add product ratings/reviews column
- Implement stock tracking

---

## 💡 Pro Tips

### Tip 1: Use Consistent Categories
Choose a set of categories and stick to them:
- Electronics
- Audio
- Wearables
- Accessories
- Home & Living

### Tip 2: Image Optimization
- Use images around 600x400px for best performance
- Compress images before uploading
- Use WebP format for smaller file sizes

### Tip 3: Pricing
- Enter prices as numbers only (no currency symbols)
- Example: `3500` not `৳3500`
- The app will format it as "৳3,500" automatically

### Tip 4: Descriptions
- Keep descriptions concise (2-3 sentences)
- Highlight key features
- Use proper grammar and spelling

---

## 📊 Example Products Sheet

Here's a complete example to copy:

| ID | Name | Price | Description | Image | Category | Image2 | Image3 |
|----|------|-------|-------------|-------|----------|--------|--------|
| 1 | Premium Headphones | 3500 | High-quality wireless headphones with active noise cancellation | /products/headphones.jpg | Audio | /products/headphones-2.jpg | /products/headphones-3.jpg |
| 2 | Smart Watch | 8500 | Fitness tracking smartwatch with heart rate monitor | /products/watch.jpg | Wearables | /products/watch-2.jpg | /products/watch-3.jpg |
| 3 | Bluetooth Speaker | 2500 | Portable wireless speaker with 10-hour battery life | /products/speaker.jpg | Audio | /products/speaker-2.jpg | /products/speaker-3.jpg |

---

## 🎯 Summary

**What You've Done**:
- ✅ Created Products sheet with correct structure
- ✅ Added 8 required columns

**What's Next**:
1. Add your product data to the sheet
2. Test locally to verify it works
3. Deploy to Vercel

**Time Estimate**: 15-30 minutes to populate products

---

Good luck! 🚀
