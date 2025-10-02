# Arhitech Chrome Extension Installation Guide

This guide will help you install and set up the Arhitech Chrome extension for Google Sheets.

## Prerequisites

- Chrome browser (version 88 or later)
- Arhitech web app authentication completed
- OpenAI API key (hardcoded in extension)

## Installation Steps

### 1. Load the Extension in Developer Mode

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Navigate to your project folder and select the `extension` folder
5. Click "Select Folder"

### 2. Configure the Extension

1. Click on the Arhitech extension icon in your Chrome toolbar
2. The extension popup will show connection status
3. If not connected, make sure you're authenticated on the Arhitech web app

### 3. Update OpenAI API Key

1. Open the extension folder in your code editor
2. Edit `extension/sidebar.js`
3. Find this line:
   ```javascript
   this.openaiApiKey = 'sk-proj-your-openai-api-key-here';
   ```
4. Replace with your actual OpenAI API key:
   ```javascript
   this.openaiApiKey = 'sk-proj-your-actual-openai-api-key';
   ```

### 4. Test the Extension

1. Go to [Google Sheets](https://docs.google.com/spreadsheets/)
2. Create a new sheet or open an existing one
3. Look for the Arhitech toggle button (🤖) on the right side
4. Click it to open the AI sidebar
5. Try typing: "write hello in A1"

## Features

### 🤖 AI Chat Interface
- Dark-themed sidebar matching TabTabTab design
- Natural language processing for spreadsheet tasks
- Real-time AI responses using OpenAI GPT-4

### 📊 Google Sheets Integration
- Write data to specific cells
- Read data from cells
- Create formulas and formatting
- Data analysis and insights

### 🔐 Authentication
- Seamless integration with Arhitech web app
- Automatic token management
- Secure data handling

## Usage Examples

### Basic Commands
- "write hello in A1"
- "write 42 in B2"
- "write =SUM(A1:A10) in C1"
- "what's in cell A1?"
- "create a chart for data in A1:B10"

### Advanced Commands
- "analyze the data in column A"
- "create a pivot table for this data"
- "format cells A1:A10 as currency"
- "add borders to the selected range"

## Troubleshooting

### Extension Not Working
1. Check if extension is enabled in `chrome://extensions/`
2. Refresh the Google Sheets page
3. Check browser console for errors (F12)

### Authentication Issues
1. Make sure you're logged in to the Arhitech web app
2. Click "Start on a new Google Sheet" or "Choose existing Sheet"
3. This will send auth data to the extension

### AI Not Responding
1. Check if OpenAI API key is correctly set
2. Verify internet connection
3. Check browser console for API errors

### Sidebar Not Appearing
1. Look for the 🤖 button on the right side of Google Sheets
2. Click it to toggle the sidebar
3. Make sure you're on a Google Sheets page

## Development

### File Structure
```
extension/
├── manifest.json          # Extension configuration
├── sidebar.html           # Main sidebar interface
├── sidebar.js            # Sidebar functionality
├── content.js            # Content script for Google Sheets
├── background.js         # Background service worker
├── popup.html            # Extension popup
├── popup.js              # Popup functionality
└── styles.css            # Dark theme styling
```

### Key Components

1. **Content Script** (`content.js`): Injects sidebar into Google Sheets
2. **Sidebar** (`sidebar.js`): Main AI chat interface
3. **Background** (`background.js`): Handles communication and storage
4. **Popup** (`popup.js`): Extension toolbar popup

### Customization

To modify the extension:
1. Edit the relevant files in the `extension/` folder
2. Go to `chrome://extensions/`
3. Click the refresh button on the Arhitech extension
4. Test your changes

## Security Notes

- OpenAI API key is hardcoded for simplicity
- In production, consider using a proxy server
- Auth tokens are stored securely in Chrome storage
- All communication is encrypted

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all prerequisites are met
3. Test with a simple command first
4. Contact support@arhitech.ai

---

**Note**: This extension requires the Arhitech web app to be running and authenticated for full functionality.
