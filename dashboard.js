// Initialize Supabase with config
const supabase = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);

// DOM elements
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const signOutBtn = document.getElementById('signOutBtn');
const newSheetBtn = document.getElementById('newSheetBtn');
const existingSheetBtn = document.getElementById('existingSheetBtn');

// Check authentication status
supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
        // User is signed in
        const user = session.user;
        userEmail.textContent = user.email;
        userName.textContent = user.user_metadata?.full_name || user.email.split('@')[0];
        
        // Store/update user data in Supabase
        await storeUserInSupabase(user, session);
    } else {
        // User is not signed in, redirect to login
        window.location.href = 'index.html';
    }
});

// Store user data in Supabase
async function storeUserInSupabase(user, session) {
    try {
        const { data, error } = await supabase
            .from('users')
            .upsert({
                supabase_uid: user.id, // Using Supabase user ID
                email: user.email,
                name: user.user_metadata?.full_name || user.user_metadata?.name,
                photo_url: user.user_metadata?.avatar_url,
                google_access_token: session.provider_token, // Google access token
                token_expires_at: new Date(session.expires_at * 1000).toISOString(),
                subscription_tier: 'free',
                trial_ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day trial
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            }, {
                onConflict: 'supabase_uid'
            });

        if (error) {
            console.error('Error storing user in Supabase:', error);
        } else {
            console.log('User stored successfully in Supabase');
        }
    } catch (error) {
        console.error('Error connecting to Supabase:', error);
    }
}

// Sign out function
signOutBtn.addEventListener('click', async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        } else {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
    }
});

// New Google Sheet button
newSheetBtn.addEventListener('click', async () => {
    try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            alert('Please sign in first.');
            return;
        }

        // Store auth data for extension
        await storeAuthForExtension(session);
        
        // Open new Google Sheet
        openNewGoogleSheet();
        
    } catch (error) {
        console.error('Error creating new sheet:', error);
        alert('Error creating new sheet. Please try again.');
    }
});

// Choose existing sheet button
existingSheetBtn.addEventListener('click', async () => {
    try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            alert('Please sign in first.');
            return;
        }

        // Store auth data for extension
        await storeAuthForExtension(session);
        
        // Open existing Google Sheets
        openExistingSheets();
        
    } catch (error) {
        console.error('Error opening existing sheets:', error);
        alert('Error opening existing sheets. Please try again.');
    }
});

// Store authentication data for extension
async function storeAuthForExtension(session) {
    try {
        // Prepare auth data for extension
        const authData = {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
            user: session.user,
            provider_token: session.provider_token // Google access token
        };

        // Store in localStorage for extension to access
        localStorage.setItem('arhitech_auth', JSON.stringify(authData));
        
        // Also store in sessionStorage as backup
        sessionStorage.setItem('arhitech_auth', JSON.stringify(authData));
        
        console.log('Auth data stored for extension');
        
        // Show success message
        showExtensionMessage();
        
    } catch (error) {
        console.error('Error storing auth data:', error);
    }
}

// Show extension message
function showExtensionMessage() {
    const message = `
    ✅ Authentication data saved!
    
    Now when you open Google Sheets:
    1. Look for the 🤖 button on the right side
    2. Click it to open the Arhitech AI assistant
    3. Start typing commands like "write hello in A1"
    
    Make sure the Arhitech extension is installed and enabled.
    `;
    
    alert(message);
}

// Open new Google Sheet
function openNewGoogleSheet() {
    const newSheetUrl = 'https://docs.google.com/spreadsheets/create';
    window.open(newSheetUrl, '_blank');
    
    // Show message about extension
    setTimeout(() => {
        alert('New Google Sheet opened! Make sure the Arhitech extension is installed and enabled to use AI features.');
    }, 1000);
}

// Open existing Google Sheets
function openExistingSheets() {
    const sheetsUrl = 'https://docs.google.com/spreadsheets/';
    window.open(sheetsUrl, '_blank');
    
    // Show message about extension
    setTimeout(() => {
        alert('Google Sheets opened! Make sure the Arhitech extension is installed and enabled to use AI features.');
    }, 1000);
}

// Handle page visibility change to refresh session if needed
document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
        try {
            // Refresh the session
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Error refreshing session:', error);
        }
    }
});