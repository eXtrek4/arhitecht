// Initialize Supabase with config
const supabase = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);

// Google Sign In Button
const googleSignInBtn = document.getElementById('googleSignInBtn');

// Sign in with Google using Supabase Auth
googleSignInBtn.addEventListener('click', async () => {
    try {
        // Sign in with Google using Supabase
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: CONFIG.googleScopes.join(' '),
                redirectTo: `${window.location.origin}/dashboard.html`
            }
        });

        if (error) {
            console.error('Error signing in:', error);
            alert('Error signing in. Please try again.');
        }
        // The redirect will happen automatically
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in. Please try again.');
    }
});

// Check if user is already signed in
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // User is signed in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});

// Privacy link handler
document.querySelector('.privacy-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('We need access to your Google account to:\n\n• Read and write to your Google Sheets\n• Create new spreadsheets\n• Manage your data securely\n\nYour data is encrypted and we never share it with third parties.');
});