// Configuration file for Arhitech
// Replace these values with your actual configuration

const CONFIG = {
    // Supabase Configuration (Primary Auth Provider)
    supabase: {
        url: process.env.SUPABASE_URL || "https://puodmpxugtcwhegahtnv.supabase.co",
        anonKey: process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1b2RtcHh1Z3Rjd2hlZ2FodG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODU3MTcsImV4cCI6MjA3NDk2MTcxN30.EtsufeeYcChr3QrTusVHWdF4DQtrAvhKxRTpOSDm_iQ"
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
window.CONFIG = CONFIG;
