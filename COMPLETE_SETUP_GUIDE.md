# 🚀 Complete Setup Guide - Dynamic Saudi Stationery Website

## 📋 Overview
This guide will help you set up your professional, dynamic e-commerce website with:
- ✅ Firebase real-time database
- ✅ Moyasar payment gateway (Saudi Arabia)
- ✅ Automatic email receipts
- ✅ WhatsApp notifications
- ✅ Admin panel with analytics
- ✅ Arabic/English support
- ✅ Saudi VAT compliance

---

## 🔥 Step 1: Firebase Setup (5 minutes)

### 1.1 Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click **"Create a project"**
3. Project name: `kdstationery-website`
4. Enable Google Analytics: **Yes**
5. Choose country: **Saudi Arabia**

### 1.2 Enable Services

#### Firestore Database
1. Go to **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Location: **asia-south1** (closest to Saudi Arabia)

#### Authentication
1. Go to **"Authentication"**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**

#### Storage (Optional)
1. Go to **"Storage"**
2. Click **"Get started"**
3. Choose **"Start in test mode"**

### 1.3 Get Configuration
1. Go to **Project Settings** (gear icon ⚙️)
2. Scroll to **"Your apps"**
3. Click web icon `</>`
4. App nickname: `KD Stationery Website`
5. **Copy the firebaseConfig object**

### 1.4 Update Your Files
Replace the config in these files:
- `firebase-config.js` (line 4-11)
- `index-dynamic.html` (line 45-48)
- `admin-dynamic.html` (line 15-18)

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "kdstationery-website.firebaseapp.com",
  projectId: "kdstationery-website",
  storageBucket: "kdstationery-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### 1.5 Create Admin User
1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Email: `admin@kdstationery.com`
4. Password: `your-secure-password`

---

## 💳 Step 2: Moyasar Payment Setup (10 minutes)

### 2.1 Create Moyasar Account
1. Go to https://moyasar.com/
2. Click **"Sign Up"**
3. Complete business verification
4. Get your **Publishable Key** from dashboard

### 2.2 Update Payment Configuration
In `moyasar-payment.js`, update line 285:
```javascript
window.PAYMENT_CONFIG = {
    moyasar: {
        publishableKey: 'pk_live_your_actual_moyasar_key' // Replace this
    }
};
```

### 2.3 Test Payment Integration
1. Use test key: `pk_test_vcFz4Aq8XFjGWyv5Zar5sdAf`
2. Test card: `4111 1111 1111 1111`
3. Any future date and CVV

---

## 📧 Step 3: EmailJS Setup (5 minutes)

### 3.1 Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for free account
3. Create email service (Gmail recommended)
4. Create email templates

### 3.2 Email Templates

#### Order Confirmation Template
```html
Subject: Order Confirmation #{{order_id}} - Knowledge Development Stationery

Dear {{to_name}},

Thank you for your order! Here are the details:

Order ID: {{order_id}}
Date: {{order_date}} at {{order_time}}

Items Ordered:
{{items_list}}

Order Summary:
Subtotal: {{subtotal}} SAR
VAT (15%): {{vat_amount}} SAR
Total: {{total_amount}} SAR

Payment Method: {{payment_method}}

We'll process your order shortly and notify you when it's ready.

Best regards,
{{store_name}}
{{store_email}}
```

#### Admin Notification Template
```html
Subject: New Order Received - #{{order_id}}

New order details:

Order ID: {{order_id}}
Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Total: {{total_amount}} SAR

Items:
{{items_list}}

View in admin panel: {{admin_panel_url}}
```

### 3.3 Update Email Configuration
In `email-service.js`, update line 320:
```javascript
window.NOTIFICATION_CONFIG = {
    email: {
        serviceId: 'your_emailjs_service_id',
        templateId: 'your_emailjs_template_id',
        publicKey: 'your_emailjs_public_key'
    }
};
```

---

## 📱 Step 4: WhatsApp Business Setup (Optional)

### 4.1 WhatsApp Business Account
1. Download WhatsApp Business app
2. Set up business profile
3. Get your business number

### 4.2 Update WhatsApp Configuration
In `email-service.js`, update line 325:
```javascript
whatsapp: {
    businessNumber: '966XXXXXXXXX' // Your actual WhatsApp Business number
}
```

---

## 🌐 Step 5: Deploy to Production

### Option A: Firebase Hosting (Recommended)

#### 5.1 Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### 5.2 Login and Initialize
```bash
firebase login
cd /path/to/your/website
firebase init hosting
```

#### 5.3 Configure
- Select your Firebase project
- Public directory: `.` (current directory)
- Single-page app: `No`
- Overwrite index.html: `No`

#### 5.4 Deploy
```bash
firebase deploy
```

#### 5.5 Custom Domain
1. In Firebase Console → Hosting
2. Click **"Add custom domain"**
3. Enter: `tanmiahdevstationery.com`
4. Follow DNS setup instructions

### Option B: Netlify Deployment

#### 5.1 Connect Repository
1. Go to https://netlify.com/
2. Connect your GitHub repository
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`

#### 5.2 Custom Domain
1. Go to Domain settings
2. Add `tanmiahdevstationery.com`
3. Update DNS records as instructed

---

## 🎯 Step 6: Initial Data Setup

### 6.1 Add Sample Products
1. Visit your deployed website
2. Go to `/setup-products.html`
3. Click **"Add Sample Products"**
4. Products will appear instantly!

### 6.2 Test Admin Panel
1. Go to `/admin-dynamic.html`
2. Login with your admin credentials
3. Verify all features work

### 6.3 Test Payment Flow
1. Add products to cart
2. Proceed to checkout
3. Use test payment details
4. Verify email receipt

---

## 🔧 Step 7: Configuration Checklist

### ✅ Firebase Configuration
- [ ] Project created and configured
- [ ] Firestore database enabled
- [ ] Authentication enabled
- [ ] Admin user created
- [ ] Config updated in all files

### ✅ Payment Configuration
- [ ] Moyasar account created
- [ ] API keys obtained
- [ ] Test payments working
- [ ] Production keys configured

### ✅ Email Configuration
- [ ] EmailJS account created
- [ ] Email templates created
- [ ] Service configured
- [ ] Test emails working

### ✅ Deployment
- [ ] Website deployed
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All pages accessible

### ✅ Testing
- [ ] Products loading correctly
- [ ] Admin panel functional
- [ ] Payment processing works
- [ ] Emails sending automatically
- [ ] Arabic/English switching works

---

## 🎉 Step 8: Go Live!

### 8.1 Final Steps
1. **Switch to production keys** (Moyasar, EmailJS)
2. **Update Firestore rules** for production
3. **Test complete order flow**
4. **Train staff on admin panel**

### 8.2 Production Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read for everyone, write for authenticated admins only
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Categories - read for everyone, write for authenticated admins only
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders - read/write for authenticated users, admins can read all
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    // Users - users can only access their own data, admins can read all
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                          (request.auth.uid == userId || 
                           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Notifications - read/write for authenticated admins only
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
                          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 🎯 What You'll Have

### 🛍️ **Customer Experience:**
- Fast, responsive shopping
- Real-time product availability
- Secure Saudi payment methods
- Automatic email receipts
- Arabic/English support
- Mobile-friendly design

### 👨‍💼 **Admin Experience:**
- Real-time dashboard
- Product management
- Order processing
- Customer analytics
- Sales reporting
- Notification system

### 🔧 **Technical Features:**
- Real-time synchronization
- Scalable cloud infrastructure
- Saudi VAT compliance
- Professional payment processing
- Automatic email system
- Mobile responsive
- SEO optimized

---

## 🆘 Support & Troubleshooting

### Common Issues:

#### Firebase Connection Issues
- Check API keys are correct
- Verify project ID matches
- Ensure Firestore rules allow access

#### Payment Not Working
- Verify Moyasar keys are correct
- Check test vs production keys
- Ensure amount is in correct format

#### Emails Not Sending
- Verify EmailJS configuration
- Check template IDs are correct
- Test with EmailJS dashboard

#### Products Not Loading
- Check Firebase connection
- Verify Firestore has data
- Check browser console for errors

### Need Help?
- Check browser console for errors
- Verify all configuration keys
- Test each service individually
- Contact support if needed

---

## 🎉 Congratulations!

Your professional Saudi stationery e-commerce website is now live with:
- ✅ Real-time database
- ✅ Secure payments
- ✅ Automatic emails
- ✅ Professional admin panel
- ✅ Saudi compliance
- ✅ Scalable infrastructure

**Your website URL:** `https://tanmiahdevstationery.com`
**Admin Panel:** `https://tanmiahdevstationery.com/admin-dynamic.html`

🚀 **Ready to serve customers across Saudi Arabia!** 🇸🇦
