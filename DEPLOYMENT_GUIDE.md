# 🚀 Deploy to tanmiahdevstationery.com

## Option 1: Netlify Deployment (Recommended)

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose "GitHub" and select `fareiscanoe1/kdstationery-website`
5. Deploy settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `/` (root)
   - **Branch:** `main`

### Step 2: Configure Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Add custom domain: `tanmiahdevstationery.com`
3. Update DNS records as instructed by Netlify
4. Enable HTTPS (automatic)

### Step 3: Configure Environment Variables
Add these in Netlify dashboard > Site settings > Environment variables:
- `NODE_ENV=production`
- `SITE_URL=https://tanmiahdevstationery.com`

## Option 2: Vercel Deployment

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import `fareiscanoe1/kdstationery-website`
5. Deploy

### Step 2: Configure Custom Domain
1. Go to Project Settings > Domains
2. Add `tanmiahdevstationery.com`
3. Update DNS records as instructed

## Option 3: GitHub Pages (Free)

### Step 1: Enable GitHub Pages
1. Go to repository settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Folder: `/` (root)

### Step 2: Configure Custom Domain
1. Add `CNAME` file with: `tanmiahdevstationery.com`
2. Update DNS records to point to GitHub Pages

## Option 4: Manual Upload to Existing Hosting

If you have existing hosting for tanmiahdevstationery.com:

### Files to Upload:
- `index.html` (main website)
- `admin.html` (admin panel)
- `admin-login.html` (admin login)
- All test files (optional)

### Steps:
1. Access your hosting control panel
2. Upload all files to public_html or www folder
3. Ensure `index.html` is in the root directory
4. Test the website

## 🎯 Recommended: Netlify

**Why Netlify:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments from GitHub
- ✅ CDN for fast loading
- ✅ Easy to manage

## 📱 After Deployment

1. **Test the website** at tanmiahdevstationery.com
2. **Test admin panel** at tanmiahdevstationery.com/admin.html
3. **Configure email service** for automatic receipts
4. **Set up payment gateway** for real payments

## 🔧 DNS Configuration

Update these DNS records for your domain:
- **A Record:** Point to Netlify IP (provided by Netlify)
- **CNAME:** www → tanmiahdevstationery.com
- **CNAME:** @ → tanmiahdevstationery.com

Your professional Saudi stationery website will be live at tanmiahdevstationery.com! 🎉
