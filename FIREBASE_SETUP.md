# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Click "Create a project"

2. **Project Setup**
   - Project name: `kdstationery-website`
   - Enable Google Analytics (optional)
   - Choose your country: Saudi Arabia

## Step 2: Enable Services

### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select location: `asia-south1` (closest to Saudi Arabia)

### Authentication
1. Go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"

### Storage (Optional)
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"

## Step 3: Get Configuration

1. **Go to Project Settings**
   - Click the gear icon ⚙️
   - Select "Project settings"

2. **Add Web App**
   - Scroll down to "Your apps"
   - Click the web icon `</>`
   - App nickname: `KD Stationery Website`
   - Check "Also set up Firebase Hosting"
   - Click "Register app"

3. **Copy Configuration**
   - Copy the `firebaseConfig` object
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "kdstationery-website.firebaseapp.com",
     projectId: "kdstationery-website",
     storageBucket: "kdstationery-website.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

## Step 4: Update Website Files

1. **Update `firebase-config.js`**
   - Replace the placeholder config with your actual config

2. **Update `index-dynamic.html`**
   - Replace the empty firebaseConfig with your config
   - Around line 45-48

3. **Update `admin-dynamic.html`** (when created)
   - Same configuration update

## Step 5: Set Up Firestore Rules

Go to Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read for everyone, write for authenticated users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Categories - read for everyone, write for authenticated users
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - read/write for authenticated users only
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    // Users - users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Notifications - read/write for authenticated users
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 6: Create Admin User

1. **Go to Authentication**
2. **Add User**
   - Click "Add user"
   - Email: `admin@kdstationery.com`
   - Password: `your-secure-password`

## Step 7: Add Sample Data

Run this in your browser console on the website:

```javascript
// This will be handled by the setup page
// Just visit: your-website.com/setup-products.html
```

## Step 8: Deploy to Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Project**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Public directory: `.` (current directory)
   - Single-page app: `No`
   - Overwrite index.html: `No`

4. **Deploy**
   ```bash
   firebase deploy
   ```

## 🎯 What You Get

✅ **Real-time Database** - Products sync instantly
✅ **User Authentication** - Secure login system
✅ **Admin Panel** - Manage everything from anywhere
✅ **Automatic Scaling** - Handles any traffic
✅ **Global CDN** - Fast loading worldwide
✅ **SSL Certificate** - Secure HTTPS
✅ **Custom Domain** - Use tanmiahdevstationery.com

## 🔧 Custom Domain Setup

1. **In Firebase Console**
   - Go to Hosting
   - Click "Add custom domain"
   - Enter: `tanmiahdevstationery.com`

2. **Update DNS Records**
   - Add the provided DNS records to your domain
   - Wait for verification (can take up to 24 hours)

## 📱 Features Available

- **Real-time product updates**
- **User accounts and login**
- **Order management**
- **Inventory tracking**
- **Sales analytics**
- **Email notifications**
- **Multi-language support**
- **Mobile responsive**
- **Saudi VAT compliance**

Your dynamic stationery website will be live and fully functional! 🚀
