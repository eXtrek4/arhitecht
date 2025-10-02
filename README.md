# Arhitech - AI Agent for Google Sheets

A web application that provides authentication for users and prepares for Chrome extension integration with Google Sheets.

## Features

- 🔐 Google OAuth2 Authentication (via Supabase)
- 📊 Google Sheets API Integration Ready
- 🗄️ Supabase Database & Auth Integration
- 🎨 Modern, Minimalist UI Design
- 🔒 Row Level Security (RLS)
- 🚀 Chrome Extension Ready

## Project Structure

```
arhitech-web/
├── index.html              # Landing/Login page
├── dashboard.html          # User dashboard
├── styles.css              # Main stylesheet
├── script.js               # Login page JavaScript
├── dashboard.js            # Dashboard JavaScript
├── config.js               # Configuration file
├── package.json            # Node.js dependencies
├── GOOGLE_CONSOLE_SETUP.md # Google Console setup guide
└── README.md               # This file
```

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd arhitech-web
npm install
```

### 2. Configure Services

#### Supabase Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Google Authentication in Supabase
3. Get your project URL and anon key
4. The database tables are already configured via migrations

#### Google Console Setup
Follow the detailed guide in `SUPABASE_GOOGLE_SETUP.md`

### 3. Update Configuration

Edit `config.js` with your actual credentials:

```javascript
const CONFIG = {
    supabase: {
        url: "your-supabase-url",
        anonKey: "your-supabase-anon-key"
    },
    googleScopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]
};
```

### 4. Start Development Server

```bash
npm run dev
```

This will start a local server at `http://localhost:3000`

## Database Schema

### Users Table
- `id` - UUID primary key
- `firebase_uid` - Firebase user ID
- `email` - User email
- `name` - Display name
- `photo_url` - Profile picture URL
- `google_access_token` - Google OAuth token
- `subscription_tier` - free/pro/enterprise
- `trial_ends_at` - Trial expiration
- `created_at` - Account creation
- `updated_at` - Last update
- `last_login` - Last login time

### User Sessions Table
- `id` - UUID primary key
- `user_id` - Reference to users table
- `session_token` - Session identifier
- `chrome_extension_id` - Extension connection
- `is_active` - Session status
- `expires_at` - Session expiration
- `created_at` - Session creation
- `last_activity` - Last activity

### Google Sheets Table
- `id` - UUID primary key
- `user_id` - Reference to users table
- `sheet_id` - Google Sheets ID
- `sheet_name` - Sheet name
- `sheet_url` - Sheet URL
- `is_shared` - Sharing status
- `last_accessed` - Last access time
- `created_at` - Record creation
- `updated_at` - Last update

## Authentication Flow

1. User visits the landing page
2. Clicks "Continue with Google"
3. Google OAuth2 popup opens
4. User grants permissions
5. Firebase handles authentication
6. User data is stored in Supabase
7. User is redirected to dashboard
8. Dashboard shows user info and options

## Chrome Extension Integration

The web app is designed to work with a Chrome extension that will:

1. Use the same authentication tokens
2. Access Google Sheets API
3. Provide AI-powered spreadsheet features
4. Sync data with the web dashboard

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- OAuth2 tokens are securely stored
- Automatic session cleanup
- CORS protection

## Development

### Adding New Features

1. Update the relevant HTML file
2. Add styles to `styles.css`
3. Implement JavaScript functionality
4. Update database schema if needed
5. Test the complete flow

### Database Changes

Use Supabase migrations:

```sql
-- Example migration
CREATE TABLE new_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- your columns here
);
```

## Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

### Environment Variables

Set these in your hosting platform:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Troubleshooting

### Common Issues

1. **OAuth redirect mismatch** - Check Google Console redirect URIs
2. **Firebase config error** - Verify Firebase configuration
3. **Supabase connection** - Check Supabase URL and key
4. **CORS errors** - Ensure proper domain configuration

### Debug Mode

Open browser console to see detailed error messages and logs.

## Support

- 📧 Email: support@arhitech.ai
- 📖 Documentation: [GOOGLE_CONSOLE_SETUP.md](GOOGLE_CONSOLE_SETUP.md)
- 🐛 Issues: Create a GitHub issue

## License

MIT License - see LICENSE file for details.

## Roadmap

- [ ] Chrome extension development
- [ ] Advanced AI features
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Enterprise features

---

Built with ❤️ by the Arhitech team
