#!/bin/bash

# 🚀 Deploy Script for tanmiahdevstationery.com
# This script will deploy your dynamic website to your domain

echo "🔥 Deploying Knowledge Development Stationery Website..."
echo "🌐 Target Domain: tanmiahdevstationery.com"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
echo "🔐 Checking Firebase authentication..."
firebase login --no-localhost

# Initialize Firebase project (if not already done)
echo "🔧 Setting up Firebase project..."
firebase use kdstationery-website

# Build and deploy
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🎉 Your website is now live at:"
echo "   📱 Firebase URL: https://kdstationery-website.web.app"
echo "   🌐 Custom Domain: https://tanmiahdevstationery.com (after DNS setup)"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Firebase Console → Hosting"
echo "2. Add custom domain: tanmiahdevstationery.com"
echo "3. Update your DNS records as instructed"
echo "4. Wait for SSL certificate (up to 24 hours)"
echo ""
echo "🔧 Admin Panel: https://tanmiahdevstationery.com/admin-dynamic.html"
echo "📦 Setup Products: https://tanmiahdevstationery.com/setup-products.html"
echo ""
echo "🎯 Your dynamic e-commerce website is ready!"
