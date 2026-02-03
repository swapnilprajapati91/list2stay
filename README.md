# List2Stay - Industry-Level Structured Website

A modern, well-organized startup website with intro video, authentication, and responsive design.

## 📁 Project Structure

```
list2stay/
├── assets/              # Static assets (images, videos)
│   ├── logo.png
│   └── intro.mp4
├── css/                 # Stylesheets (organized by concern)
│   ├── variables.css    # Design tokens & CSS variables
│   ├── base.css         # Reset & typography
│   ├── components.css  # Reusable UI components
│   ├── pages.css        # Page-specific styles
│   ├── auth.css         # Authentication pages styles
│   └── main.css         # Main stylesheet (imports all)
├── js/                  # JavaScript modules
│   ├── utils.js         # Utility functions
│   ├── mobile-menu.js   # Mobile menu handler
│   ├── search.js        # Search bar handler
│   ├── splash.js        # Intro video handler
│   └── login.js        # Authentication handler
├── pages/               # HTML pages
│   ├── home.html        # Main website page
│   └── login.html       # Login page
├── index.html           # Entry point (intro video)
└── README.md            # This file
```

## 🚀 Getting Started

### Local Development

1. **Simple Server (Python)**
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000`

2. **VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Node.js (http-server)**
   ```bash
   npx http-server -p 8000
   ```

## 📄 Pages

- **`index.html`** - Intro video splash screen (auto-redirects to home after video)
- **`pages/home.html`** - Main website with header, navigation, and content sections
- **`pages/login.html`** - User authentication page

## 🎨 Design System

### CSS Architecture

- **Variables** (`css/variables.css`) - Centralized design tokens
- **Base** (`css/base.css`) - Global reset and typography
- **Components** (`css/components.css`) - Reusable UI components (buttons, cards, search)
- **Pages** (`css/pages.css`) - Page-specific layouts
- **Auth** (`css/auth.css`) - Authentication page styles

### Color Palette

- Background: `#070A12` (Dark blue)
- Foreground: `#EEF2FF` (Light blue-white)
- Primary: `#6D5EF6` (Purple)
- Secondary: `#3DD7D9` (Cyan)

## 🔧 Features

- ✅ Responsive design (mobile-first)
- ✅ Mobile menu with hamburger toggle
- ✅ Flexible search bar (icon-only on mobile)
- ✅ Intro video with auto-redirect
- ✅ Form validation
- ✅ Modern glass-morphism UI
- ✅ Clean, maintainable code structure

## 📱 Responsive Breakpoints

- **Mobile**: ≤ 760px
- **Desktop**: > 760px

## 🛠️ Customization

### Update Colors
Edit `css/variables.css` to change the color scheme.

### Add New Pages
1. Create HTML file in `pages/` folder
2. Link `../css/main.css` in `<head>`
3. Add page-specific styles to `css/pages.css` if needed

### Add JavaScript Functionality
1. Create new JS file in `js/` folder
2. Use IIFE pattern for encapsulation
3. Include script tag in HTML

## 📝 Code Style

- **CSS**: BEM naming convention (`.block__element--modifier`)
- **JavaScript**: IIFE pattern for module-like behavior
- **HTML**: Semantic HTML5 with ARIA labels
- **Comments**: JSDoc-style comments for functions

## 🔒 Security Notes

- Login form submits to external API (SheetDB)
- No sensitive data stored in frontend
- Consider implementing proper backend authentication for production

## 📄 License

This project is for List2Stay startup. All rights reserved.

---

**Built with modern web standards and best practices** ✨
