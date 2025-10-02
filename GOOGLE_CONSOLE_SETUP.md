# Google Console Setup Guide for Arhitech

This guide will walk you through setting up Google Cloud Console to enable OAuth2 authentication and Google Sheets API access for your Arhitech application.

## Prerequisites

- Google account
- Access to Google Cloud Console
- Your domain name (for OAuth consent screen)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter project name: `Arhitech` (or your preferred name)
5. Select your organization (if applicable)
6. Click "Create"
7. Wait for the project to be created and select it

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable the following APIs:

### Required APIs:
- **Google Sheets API** - For reading/writing to Google Sheets
- **Google Drive API** - For creating and managing files
- **Google+ API** - For user profile information
- **Gmail API** - (Optional) For email functionality

### Enable APIs:
1. Search for "Google Sheets API"
2. Click on it and press "Enable"
3. Repeat for each API listed above

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have Google Workspace)
3. Click "Create"

### App Information:
- **App name**: `Arhitech`
- **User support email**: `support@arhitech.ai`
- **App logo**: Upload your logo (optional)
- **App domain**: 
  - Homepage URL: `https://yourdomain.com`
  - Privacy policy URL: `https://yourdomain.com/privacy`
  - Terms of service URL: `https://yourdomain.com/terms`
- **Authorized domains**: Add your domain (e.g., `yourdomain.com`)

### Scopes:
Add the following scopes:
- `https://www.googleapis.com/auth/spreadsheets` - View and manage your spreadsheets
- `https://www.googleapis.com/auth/drive` - View and manage your Google Drive files
- `https://www.googleapis.com/auth/userinfo.email` - See your primary Google Account email address
- `https://www.googleapis.com/auth/userinfo.profile` - See your personal info

### Test Users (for development):
- Add your email address and any test users
- This allows testing before publishing

## Step 4: Create OAuth2 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Enter name: `Arhitech Web Client`

### Authorized JavaScript origins:
```
http://localhost:3000
http://localhost:8080
https://yourdomain.com
```

### Authorized redirect URIs:
```
http://localhost:3000
http://localhost:8080
https://yourdomain.com
https://yourdomain.com/dashboard.html
```

5. Click "Create"
6. Copy the **Client ID** and **Client Secret** - you'll need these for Firebase configuration

## Step 5: Configure Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to "Authentication" > "Sign-in method"
4. Enable "Google" provider
5. Enter your OAuth2 Client ID and Client Secret from Step 4
6. Copy the Firebase configuration object

## Step 6: Update Your Configuration

Update your `config.js` file with the following values:

```javascript
const CONFIG = {
    firebase: {
        apiKey: "your-firebase-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-firebase-app-id"
    },
    supabase: {
        url: "your-supabase-url",
        anonKey: "your-supabase-anon-key"
    }
};
```

## Step 7: Chrome Extension Configuration (Future)

When you're ready to build the Chrome extension, you'll need to:

1. Create a new OAuth2 client for Chrome extension
2. Set the application type to "Chrome app"
3. Add your extension ID to authorized origins
4. Configure the extension manifest with proper permissions

## Step 8: Testing

1. Start your local development server
2. Open `http://localhost:3000` (or your configured port)
3. Click "Continue with Google"
4. Complete the OAuth flow
5. Verify you're redirected to the dashboard

## Security Considerations

1. **Never expose your Client Secret** in client-side code
2. **Use environment variables** for sensitive configuration
3. **Implement proper CORS** settings
4. **Set up proper redirect URIs** to prevent unauthorized access
5. **Regularly rotate** your OAuth credentials

## Troubleshooting

### Common Issues:

1. **"This app isn't verified"** - This is normal for development. Click "Advanced" > "Go to [App Name] (unsafe)"

2. **"redirect_uri_mismatch"** - Check that your redirect URIs in Google Console match your application URLs

3. **"invalid_client"** - Verify your Client ID is correct

4. **"access_denied"** - User denied permission or scope issues

### Debug Steps:

1. Check browser console for errors
2. Verify Firebase configuration
3. Check Google Console for API quotas
4. Ensure all required APIs are enabled
5. Verify OAuth consent screen is properly configured

## Production Deployment

Before going live:

1. **Publish your OAuth consent screen** (requires verification for sensitive scopes)
2. **Update redirect URIs** to production URLs
3. **Remove test users** from OAuth consent screen
4. **Set up proper monitoring** and logging
5. **Implement rate limiting** and abuse prevention

## Support

If you encounter issues:

1. Check Google Cloud Console logs
2. Review Firebase Authentication logs
3. Check browser network tab for failed requests
4. Contact Google Cloud Support for API issues
5. Email support@arhitech.ai for application-specific issues

---

**Note**: This setup allows your web application to authenticate users and access their Google Sheets. The Chrome extension will use the same authentication flow but with additional configuration for extension-specific permissions.
