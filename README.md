# Garments Order & Production Tracker System (Client)

A modern, responsive, and full-featured frontend application built for managing garments orders, production workflows, tracking updates, and role-based dashboards. This project is part of the Assignment-11 Job Task.

## 🚀 Live Website  
🔗 **Live URL:** https://garments-order-tracking-system.web.app/  

## 👥 Admin & Manager Access  
| Role | Email | Password |
|------|--------|-----------|
| Admin | admin@gmail.com | Admin@ |
| Manager | manager@gmail.com | Manager@ |

> Replace these with your actual credentials.

---

## 📌 Project Overview  
The **Garments Order & Production Tracker System** is a web-based platform designed for small & medium factories to manage:

- Buyer bookings  
- Product creation & management  
- Production tracking (cutting → sewing → finishing → shipping)  
- User role & permission system  
- Inventory & order flow  
- Fully dynamic dashboards  

The client is built using **React.js**, **TailwindCSS**, **Firebase Auth**, **React Hook Form**, **TanStack Query**, and **Axios**.

---

## ✨ Key Features

### 🏠 Public Pages
- Beautiful Home Page with:
  - Hero Banner + CTA  
  - Our Products (6 items from MongoDB)  
  - How It Works  
  - Customer Feedback Carousel  
  - 2 additional custom sections  

- Login Page (Email + Password + Google/Github login option)
- Register Page with:
  - Upload photo via File Upload → ImgBB
  - Role selection
  - Strong password validation  
- All Products Page  
- Product Details (Private Route)

---

## 🔐 Authentication & Security
- Firebase Authentication (email/password + social)  
- JWT stored in HTTP-only cookies  
- Protected Routes (Admin / Manager / Buyer)
- Suspended users:
  - Cannot place orders  
  - Receive suspension feedback on Profile page  

---

## 📦 Buyer Dashboard
- My Orders  
- Track Order with full timeline  
- Profile Update  
- Cancel pending orders  

---

## 🧑‍💼 Manager Dashboard
- Add Product  
- Manage Products  
- Pending Orders  
- Approve/Reject Orders  
- Approved Orders (Add tracking)  
- My Profile  

---

## 🛠 Admin Dashboard
- Manage Users (promote, demote, suspend)  
- All Products (update, delete, show on home)  
- All Orders  
- Analytics Dashboard:
  - Today / Week / Month  
  - Bar / Pie / Line charts  

---

## 🛠 Technologies Used (Frontend)

| Category | Tech |
|---------|------|
| Framework | React.js |
| Routing | React Router |
| State/Data | TanStack Query |
| Forms | React Hook Form |
| UI | Tailwind + DaisyUI / Custom Components |
| Animations | Framer Motion |
| Auth | Firebase Authentication |
| HTTP | Axios |
| Image Upload | ImgBB API |
| Charts | Recharts |
| Notifications | React-Hot-Toast / SweetAlert |
| Deployment | Vercel / Netlify |

---

## 🏗 Folder Structure
```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── layouts/
 ├── routes/
 ├── context/
 ├── utils/
 ├── services/
```





## 📝 NPM Packages Used

```
react
react-router-dom
firebase
axios
@tanstack/react-query
react-hook-form
react-hot-toast
sweetalert2
framer-motion
recharts
bcryptjs
jwt-decode
```

---

## 📄 Additional Features

- Responsive design (Mobile, Tablet, Desktop)
- Loading spinners & skeleton UI
- Dark mode & Light mode toggle
- 404 Not Found page
- Protected navigation on reload
- Smooth animations everywhere

---

## 🏁 Final Notes

- Client contains **20+ meaningful commits**
- Environment variables secured
- Fully responsive and modern UI
- Unique design (not matching any module project)

---

## 🧑‍💻 Developer
**Soumic Shahriar**  
Garments Order & Production Tracker System  
Assignment-11 — Job Task  
