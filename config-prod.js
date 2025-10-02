// Production Configuration for Arhitech
// This file will be used when deployed to production

const CONFIG = {
    // Supabase Configuration (Primary Auth Provider)
    supabase: {
        url: process.env.SUPABASE_URL || "your-supabase-url",
        anonKey: process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key"
    },
    
    // Google OAuth Scopes
    googleScopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    
    // App Configuration
    app: {
        name: "Arhitech",
        version: "1.0.0",
        supportEmail: "support@arhitech.ai"
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
