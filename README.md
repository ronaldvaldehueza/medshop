# 🏥 MedShop – Medical Equipment E-Commerce (Quote-Based Checkout)

This repository contains the core source files for the **MedShop** project.  
Some stylesheets (and other assets), and environment-specific configs have been excluded for security and brevity.

🔗 **Live Demo:** [https://eshop.worldcloud9.com](https://eshop.worldcloud9.com)

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Security Notice](#security-notice)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## 📌 Project Overview

**MedShop** is a modern e-commerce platform built for a medical supply business. Unlike traditional web stores, it does not advertise prices but instead facilitates **Request-for-Quotation (RFQ)** transactions. Customers can browse products, add items to a cart, and submit a quote request for a personalized response including pricing and volume discounts.

---

## ✨ Features

### 🏠 Home Page
- Banner showcasing accessibility-focused equipment
- "New Products" spotlight
- Full "All Products" browsing section

### 🔍 Smart Search & Navigation
- Keyword search bar for direct access to products
- Two main categories:
  - **Medical Equipment**
  - **Medical Supplies**
- Medical Equipment subcategories include:
  - Air or Bed Mattress
  - Bathroom Safety
  - Beds
  - Canes & Standing Aids
  - Durable Medical Equipment
  - Hoist or Patient Transfer
  - Orthopedic Care
  - Mobility

### 🛒 Shopping Experience
- Product cards with:
  - Preview
  - Favorite
  - Star ratings
  - Add to cart
- Cart Sidebar:
  - View selected items
  - Checkout options: “Checkout Now” or “View Cart”

### 📦 RFQ-Based Checkout Flow
1. **Cart Overview** – Summary of items
2. **Shipping/Billing Details** – Customer inputs address info
3. **Order Confirmation** – Final order review
4. **Quote Request Submission** – Sends data to the shop for manual pricing

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Frontend**: React (JSX), Tailwind CSS *(excluded)*
- **Forms**: React Hook Form / Custom validation
- **Localization**: i18next
- **Package Manager**: Yarn
- **Deployment**: Cloud-hosted on a private server

---

## 📁 Project Structure

```
MedShop/
├── pages/
│   ├── index.jsx                  # Home page
│   ├── cart.jsx                   # Shopping cart
│   ├── checkout-contact.jsx       # RFQ shipping & billing info
│   ├── checkout.jsx               # Main checkout logic
│   ├── order-placed.jsx          # Final confirmation page
│   └── [others].jsx
├── public/
│   ├── assets/                    # Static images/icons (if applicable)
│   └── favicon.ico
├── components/
│   ├── ProductCard.jsx            # Item display component
│   ├── CategoryMenu.jsx           # Side menu for category navigation
│   ├── CartSidebar.jsx            # Drawer view of cart items
│   └── Header.jsx                 # Top navigation bar
├── i18next.config.js              # Internationalization config
├── next.config.js                 # Next.js runtime config
├── package.json                   # App dependencies
├── .env.local                     # Local dev config (excluded)
└── yarn.lock                      # Lockfile for package versions
```

---

## ⚙️ Setup

> 💡 This repository is intended for source code review and portfolio/demo purposes only. It is not meant to be deployed as-is without the missing styles and config.

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronaldvaldehueza/medshop.git
   cd medshop
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Add environment config**
   Create a `.env.local` file (see `.env.example` if available) with necessary runtime variables.

4. **Start development server**
   ```bash
   yarn dev
   ```

---

## 🔐 Security Notice

This repository contains only core source files and does **not** include:
- Styling files (CSS/Tailwind)
- `.env.local`, `.env.production`, or other configuration secrets
- Image/media assets
- Server-side logic or APIs (if applicable)

This is done to protect business data and maintain code brevity for demonstration purposes.

---

## 🤝 Contributing

Although this repository is a personal showcase, feel free to:
- Fork it
- Use it as inspiration
- Submit issues or ideas

Pull requests are welcome for non-business content.

---

## 📬 Contact

For any inquiries or to get in touch:

**👤 Author:** Ronald Valdehueza  
**📧 Email:** [roncu.valdehueza@gmail.com](mailto:roncu.valdehueza@gmail.com)

---

## 📄 License

This project is shared publicly for resume/portfolio demonstration only.  
All business-related materials (branding, product data, images) are owned by their respective entities.

---
