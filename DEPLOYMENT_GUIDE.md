# Arhitech Deployment Guide

This guide will help you deploy Arhitech to work properly with Google OAuth2 and the Chrome extension.

## 🚨 **Why Localhost Doesn't Work**

- Google OAuth2 requires HTTPS and proper domain names
- Chrome extensions have security restrictions with localhost
- Redirect URIs must be registered in Google Console

## 🚀 **Quick Solution: Use ngrok (Recommended for Testing)**

### Step 1: Install ngrok
```bash
npm install -g ngrok
```

### Step 2: Run the deployment script
**Windows:**
```bash
deploy-local.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-local.sh
./deploy-local.sh
```

### Step 3: Update Google Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Edit your OAuth2 client
4. Update **Authorized JavaScript origins**:
   ```
   https://your-ngrok-url.ngrok.io
   ```
5. Update **Authorized redirect URIs**:
   ```
   https://your-ngrok-url.ngrok.io
   https://your-ngrok-url.ngrok.io/dashboard.html
   ```

### Step 4: Update Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to "Authentication" > "URL Configuration"
3. Update **Site URL**: `https://your-ngrok-url.ngrok.io`
4. Update **Redirect URLs**: `https://your-ngrok-url.ngrok.io/dashboard.html`

### Step 5: Test
1. Visit your ngrok URL
2. Test authentication
3. Test the Chrome extension

## 🌐 **Production Deployment: Vercel**

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

### Step 3: Set Environment Variables
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

### Step 4: Update Google Console
Use your Vercel domain instead of ngrok URL.

## 🔧 **Alternative: Netlify**

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Deploy
```bash
netlify deploy --prod --dir .
```

### Step 3: Set Environment Variables
In Netlify dashboard, add:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 📋 **Checklist for Working Deployment**

- [ ] HTTPS enabled (not localhost)
- [ ] Google Console OAuth2 configured with correct URLs
- [ ] Supabase configured with correct URLs
- [ ] Chrome extension can communicate with the domain
- [ ] Authentication flow works end-to-end
- [ ] Extension appears in Google Sheets

## 🐛 **Troubleshooting**

### "This app isn't verified"
- This is normal for development
- Click "Advanced" > "Go to [App Name] (unsafe)"

### "redirect_uri_mismatch"
- Check Google Console redirect URIs match exactly
- Include both root and dashboard URLs

### Extension not communicating
- Make sure website is HTTPS
- Check extension manifest for correct domain
- Verify localStorage is working

### Authentication not working
- Check Supabase URL configuration
- Verify Google OAuth2 settings
- Check browser console for errors

## 🚀 **Quick Start (Recommended)**

1. **Run ngrok deployment**:
   ```bash
   # Windows
   deploy-local.bat
   
   # Mac/Linux  
   ./deploy-local.sh
   ```

2. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

3. **Update Google Console** with the ngrok URL

4. **Update Supabase** with the ngrok URL

5. **Test everything** at the ngrok URL

This will give you a working HTTPS version of your app that can properly communicate with Google OAuth2 and the Chrome extension!

---

**Note**: For production, use Vercel or Netlify instead of ngrok for better performance and reliability.
