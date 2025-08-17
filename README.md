# PinAdBlock - Pinterest Ad Blocker

An efficient Pinterest ad blocker browser extension that automatically detects and blocks promotional content and advertisements on Pinterest.

## ✨ Features

- 🚫 **Automatic Ad Blocking** - Real-time detection and hiding of promoted content on Pinterest
- 📊 **Statistics** - Real-time count of blocked advertisements
- 🎛️ **Toggle Control** - Easy enable/disable ad blocking functionality
- 🌍 **Multi-language Support** - Recognizes ads in 13+ languages
- 🌐 **Wide Compatibility** - Works on pinterest.com and pinterest.cn
- 💨 **Lightweight** - No impact on page loading speed
- 🎨 **User-friendly Interface** - Clean and intuitive popup design

## 🌍 Multi-language Support

This extension supports ad recognition in the following languages, covering Pinterest's major user countries:

| Language | Countries/Regions | Example Keywords |
|----------|-------------------|------------------|
| 🇨🇳 Chinese | China, Taiwan, Hong Kong | 推广, 广告, 赞助的Pin |
| 🇺🇸 English | USA, UK, Australia | Promoted, Sponsored, Ad |
| 🇯🇵 Japanese | Japan | プロモーション, 広告, スポンサー |
| 🇰🇷 Korean | South Korea | 프로모션, 광고, 스폰서 |
| 🇮🇱 Hebrew | Israel | מקודם, ממומן, פרסומת |
| 🇲🇦 Arabic | Morocco, Tunisia, Iraq | مروج, ممول, إعلان |
| 🇱🇹 Lithuanian | Lithuania | Reklamuojama, Remiama |
| 🇸🇬 Malay | Singapore | Dipromosikan, Iklan |
| 🇫🇷 French | Switzerland, Morocco | Promu, Sponsorisé |
| 🇩🇪 German | Switzerland | Beworben, Gesponsert |
| 🇮🇹 Italian | Switzerland | Promosso, Sponsorizzato |
| 🇹🇿 Swahili | Tanzania | Kukuzwa, Tangazo |
| 🇪🇨 Spanish | Ecuador | Promocionado, Patrocinado |

> For detailed multi-language support information, see [MULTILINGUAL_SUPPORT.md](MULTILINGUAL_SUPPORT.md)

## 📦 Installation

### Method 1: Developer Mode Installation (Recommended)

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" toggle in the top right
4. Click "Load unpacked"
5. Select this project's folder
6. Extension installed successfully!

### Method 2: Packaged Installation

1. Go to Chrome extensions page and click "Pack extension"
2. Select this project folder to generate .crx file
3. Drag the .crx file to Chrome extensions page to install

## 🚀 Usage

1. After installation, visit Pinterest website
2. The extension will automatically start blocking ads
3. Click the extension icon in the browser toolbar to view statistics
4. Use the popup interface to enable/disable ad blocking

## 🔍 Blocking Mechanism

The extension identifies and blocks ads through:

- Detection of keywords: "推广", "广告", "Promoted", "Sponsored", etc.
- Recognition of specific ad-related CSS classes and data attributes
- DOM change monitoring for real-time blocking of newly loaded ads
- CSS styling to hide advertisement elements

## 📁 File Structure

```
pinterest-ad-blocker/
├── manifest.json          # Extension configuration
├── content.js             # Content script (main blocking logic)
├── background.js          # Background script
├── popup.html             # Popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup script
├── icons/                 # Icon files
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # Documentation
```

## ⚙️ Technical Features

- **Manifest V3**: Latest Chrome extension API
- **Real-time Monitoring**: MutationObserver for DOM changes
- **Performance Optimized**: Debounced processing to avoid frequent execution
- **User-friendly**: Intuitive statistics interface and control options

## ⚠️ Notes

- This extension only works on Pinterest websites
- It may take a few seconds to fully block all ads on first page visit
- If you find unblocked ads, you can report issues through the popup interface

## 📋 Changelog

### v1.0.0
- Initial release
- Basic ad blocking functionality
- Statistics and control interface

## 📄 License

MIT License

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this extension!

## 🔗 Links

- **GitHub Repository**: https://github.com/BLEZZ0102/pinterest-ad-blocker
- **Report Issues**: https://github.com/BLEZZ0102/pinterest-ad-blocker/issues
- **Privacy Policy**: https://github.com/BLEZZ0102/pinterest-ad-blocker/blob/main/PRIVACY_POLICY.md

## ⚖️ Disclaimer

This extension is for educational and personal use only. Please comply with the terms of service of relevant websites.
