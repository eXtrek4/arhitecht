#!/bin/bash
# Deploy Arhitech locally with ngrok

echo "🚀 Starting Arhitech deployment..."

# Start the local server
echo "📡 Starting local server on port 3000..."
npm run dev &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Start ngrok tunnel
echo "🌐 Creating public tunnel with ngrok..."
ngrok http 3000 --log=stdout > ngrok.log &
NGROK_PID=$!

# Wait for ngrok to start
sleep 5

# Get the public URL
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*' | grep -o 'https://[^"]*')

if [ -z "$PUBLIC_URL" ]; then
    echo "❌ Failed to get ngrok URL"
    exit 1
fi

echo "✅ Arhitech is now available at: $PUBLIC_URL"
echo ""
echo "🔧 Next steps:"
echo "1. Update Google Console OAuth2 settings:"
echo "   - Authorized JavaScript origins: $PUBLIC_URL"
echo "   - Authorized redirect URIs: $PUBLIC_URL, $PUBLIC_URL/dashboard.html"
echo ""
echo "2. Update Supabase settings:"
echo "   - Site URL: $PUBLIC_URL"
echo ""
echo "3. Test the application at: $PUBLIC_URL"
echo ""
echo "Press Ctrl+C to stop both server and ngrok"

# Keep script running
wait
