# 🛒 GroceryHUB

GroceryHUB is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application for online grocery shopping.

Users can browse products, add items to their cart, and place orders using **Cash on Delivery (COD)** or **Online Payment** methods.  
The application also includes an admin panel for managing products and viewing all orders.

---

## 🔗 Features

### 👤 User Side:
- 🛍 Browse a wide range of grocery products
- 🛒 Add items to cart
- 💳 Place orders via **COD** or **Online Payment**
- 📦 Order tracking and history

### 🔐 Admin Panel:
- 🔑 One Admin Login
- ➕ Add new products
- 📊 Manage stock & product info
- 📬 View all user orders

---

## 📸 Home Page Screenshot

> ![Image](https://github.com/user-attachments/assets/d01461f2-b5c9-4693-9fde-11a655ae1f3f)

---

## ⚙️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Integration**: (e.g., Razorpay / Stripe - replace with your actual service)

---

## 🚀 Getting Started

### Clone the project

git clone https://github.com/NKSG100/GroceryHUB.git
cd GroceryHUB

### Backend Setup

cd server
npm install
npm start


### Frontend Setup

cd client
npm install
npm start

> Make sure to configure your `.env` files for both frontend and backend.

.env in server should have:
MONGODB_URI
JWT_SECRET
NODE_ENV

SELLER_EMAIL
SELLER_PASSWORD

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET

.env in client should have:
VITE_BACKEND_URL

(/* For Privacy Reasons env variables are not uploaded on Github*/)

### 🎉 Thank you for checking out **GroceryHUB**!

If you found this project helpful or inspiring, feel free to ⭐ star the repo and share it with others.

Happy Coding! 🚀