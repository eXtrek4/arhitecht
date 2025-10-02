@echo off
echo 🚀 Starting Arhitech deployment...

echo 📡 Starting local server on port 3000...
start "Arhitech Server" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

echo 🌐 Creating public tunnel with ngrok...
start "Ngrok Tunnel" cmd /k "ngrok http 3000"

timeout /t 5 /nobreak > nul

echo.
echo ✅ Arhitech deployment started!
echo.
echo 🔧 Next steps:
echo 1. Check the ngrok window for your public URL (e.g., https://abc123.ngrok.io)
echo 2. Update Google Console OAuth2 settings with the ngrok URL
echo 3. Update Supabase settings with the ngrok URL
echo 4. Test the application
echo.
echo Press any key to continue...
pause > nul
