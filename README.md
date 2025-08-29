# Dr. Ziyadova Pediatric Website

A comprehensive, multilingual pediatric infectious diseases website for Dr. Ziyadova. Built with vanilla HTML, CSS, and JavaScript for optimal performance and SEO.

## 🌟 Features

### Core Features
- **3-Language Support**: Azerbaijani (AZ), Russian (RU), English (EN)
- **High SEO Optimization**: Structured data, meta tags, sitemap, robots.txt
- **Responsive Design**: Mobile-first approach, works on all devices
- **Fast Performance**: Optimized assets, critical CSS, lazy loading
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support

### Medical Features
- **Disease Information**: Comprehensive pages for pediatric infectious diseases
- **WhatsApp Integration**: Direct contact via WhatsApp (+994 50 466 22 44)
- **Professional Design**: Medical-themed, trustworthy appearance
- **Legal Disclaimers**: Proper medical disclaimers on all pages

### Technical Features
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Modular CSS**: Organized, maintainable stylesheets
- **SEO Optimized**: Structured data, hreflang, canonical URLs
- **Performance Optimized**: Critical CSS, lazy loading, optimized images

## 📁 Project Structure

```
ZiyadovaPediatrics/
├── index.html                 # Main redirect page
├── 404.html                   # Custom 404 error page
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Search engine directives
├── README.md                 # Project documentation
│
├── az/                       # Azerbaijani pages
│   ├── index.html           # Homepage
│   ├── about.html           # About page
│   ├── services.html        # Services page
│   ├── faq.html             # FAQ page
│   ├── gallery.html         # Gallery page
│   ├── contact.html         # Contact page
│   ├── privacy.html         # Privacy policy
│   ├── terms.html           # Terms of service
│   └── diseases/            # Disease pages
│       ├── index.html       # Diseases overview
│       ├── sut-intoleransi.html
│       ├── usaq-yoluxucu-xestelikler.html
│       ├── sepgili-infeksion-xestelikler.html
│       ├── anadangelme-infeksion-xestelikler.html
│       ├── rutin-peyvend-cedvelleri.html
│       └── yoluxucu-xestelikler.html
│
├── ru/                       # Russian pages (same structure as az/)
├── en/                       # English pages (same structure as az/)
│
├── assets/                   # Static assets
│   ├── css/                 # Stylesheets
│   │   ├── base.css         # Base styles, variables, typography
│   │   ├── layout.css       # Layout, grid, responsive
│   │   ├── components.css   # UI components (buttons, cards, etc.)
│   │   └── pages.css        # Page-specific styles
│   │
│   ├── js/                  # JavaScript files
│   │   ├── main.js          # Main functionality
│   │   ├── accordion.js     # FAQ accordion
│   │   └── lightbox.js      # Gallery lightbox
│   │
│   └── img/                 # Images and icons
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── site.webmanifest
│
└── images/                   # Content images
    ├── WhatsApp Image 2025-08-13 at 00.07.11_569249bc.jpg
    ├── WhatsApp Image 2025-08-13 at 00.07.12_71bb2d95.jpg
    └── ... (other images)
```

## 🚀 Getting Started

### Prerequisites
- Web server (Apache, Nginx, or any static hosting)
- Modern web browser
- No build tools required (vanilla HTML/CSS/JS)

### Installation

1. **Clone or Download** the project files
2. **Upload** to your web server
3. **Configure** your domain to point to the project directory
4. **Test** the website functionality

### Local Development

For local development, you can use any simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Design System

### Colors
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#10b981` (Green)
- **Accent**: `#f59e0b` (Orange)
- **Text Primary**: `#1f2937` (Dark Gray)
- **Text Secondary**: `#6b7280` (Medium Gray)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Secondary Font**: Manrope (Google Fonts)
- **Font Sizes**: Responsive scale from 0.75rem to 3rem

### Components
- **Buttons**: Primary, secondary, outline, ghost variants
- **Cards**: Service cards, disease cards, testimonial cards
- **Navigation**: Sticky header, mobile menu, breadcrumbs
- **Forms**: Contact forms, search functionality
- **Modals**: Lightbox for gallery, contact forms

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Configuration

### WhatsApp Integration
Update the WhatsApp number in:
- `assets/js/main.js` (line with phone number)
- All HTML files with `data-whatsapp` attributes
- Contact information in footers

### Language Configuration
Language switching is handled in:
- `assets/js/main.js` (language switcher functions)
- URL structure: `/az/`, `/ru/`, `/en/`
- Hreflang tags in all HTML files

### SEO Configuration
- Update `sitemap.xml` with your domain
- Modify `robots.txt` as needed
- Update structured data in HTML files
- Configure Google Analytics (if needed)

## 📊 SEO Features

### Technical SEO
- **Structured Data**: JSON-LD for medical information
- **Meta Tags**: Comprehensive meta descriptions and titles
- **Hreflang**: Proper language alternates
- **Canonical URLs**: Prevent duplicate content
- **Sitemap**: XML sitemap with all pages
- **Robots.txt**: Search engine directives

### Content SEO
- **Semantic HTML**: Proper heading structure
- **Alt Text**: Descriptive image alt attributes
- **Internal Linking**: Strategic internal links
- **Breadcrumbs**: Navigation and SEO breadcrumbs
- **FAQ Schema**: Structured FAQ data

## 🔒 Security & Privacy

### Security Features
- **HTTPS Ready**: All external links use HTTPS
- **Content Security**: No inline scripts (except critical CSS)
- **XSS Protection**: Proper HTML escaping
- **CSRF Protection**: No forms that could be exploited

### Privacy Features
- **GDPR Compliant**: Privacy policy and terms
- **No Tracking**: No analytics or tracking scripts by default
- **Data Minimization**: Only necessary data collection
- **Transparency**: Clear privacy information

## 🏥 Medical Disclaimer

All medical information on this website includes proper disclaimers:
- Information is for educational purposes only
- Not a substitute for professional medical advice
- Always consult a healthcare provider
- Emergency situations require immediate medical attention

## 📞 Contact Information

- **WhatsApp**: +994 50 466 22 44
- **Instagram**: [@dr.ziyadova](https://www.instagram.com/dr.ziyadova)
- **Email**: info@ziyadovapediatrics.com
- **Location**: Baku, Azerbaijan

## 🛠️ Maintenance

### Regular Updates
- **Content Updates**: Medical information should be reviewed regularly
- **Image Optimization**: Compress new images before adding
- **Link Checking**: Verify external links periodically
- **Performance Monitoring**: Check Lighthouse scores regularly

### Backup
- **Regular Backups**: Backup all files and database (if any)
- **Version Control**: Use Git for version tracking
- **Testing**: Test on multiple devices and browsers

## 📈 Performance Optimization

### Current Optimizations
- **Critical CSS**: Inline critical styles
- **Lazy Loading**: Images load as needed
- **Minified Assets**: CSS and JS are optimized
- **Image Optimization**: WebP format where possible
- **Font Loading**: Optimized Google Fonts loading

### Further Optimizations
- **CDN**: Use a CDN for faster global delivery
- **Caching**: Implement proper caching headers
- **Compression**: Enable Gzip/Brotli compression
- **Image CDN**: Use image optimization services

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📝 License

This project is created for Dr. Ziyadova's pediatric practice. All rights reserved.

## 🤝 Contributing

This is a private project for Dr. Ziyadova. For questions or suggestions, please contact the development team.

## 📞 Support

For technical support or questions about the website:
- **Email**: info@ziyadovapediatrics.com
- **WhatsApp**: +994 50 466 22 44

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Production Ready
