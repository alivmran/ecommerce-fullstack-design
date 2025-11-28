ShopHub - Full Stack E-Commerce Application

A fully functional, responsive e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). This project was developed as part of a Full Stack Development Internship.

🚀 View Live Demo

✨ Features

🛍️ User Features

Product Browsing: View all products with filtering and search functionality.

Product Details: Detailed view with price, description, and stock status.

Shopping Cart: persistent cart (saves items on refresh) using LocalStorage.

User Authentication: Secure Login and Registration system using JWT.

Responsive Design: Optimized for Mobile, Tablet, and Desktop.

🛡️ Admin Features

Admin Dashboard: Exclusive access for administrators.

Product Management: Create, Update, and Delete products.

Secure Registration: "Secret Key" gate to prevent unauthorized admin signups.

🛠️ Tech Stack

Frontend: React (Vite), TypeScript, Tailwind CSS, Zustand (State Management), Shadcn UI.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Cloud Database).

Authentication: JSON Web Tokens (JWT) & Bcrypt.

Deployment: Vercel (Frontend & Backend).

🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js installed

MongoDB Atlas account (or local MongoDB)

1. Clone the Repository

git clone [https://github.com/YOUR_USERNAME/ecommerce-fullstack-design.git](https://github.com/YOUR_USERNAME/ecommerce-fullstack-design.git)
cd ecommerce-fullstack-design


2. Install Dependencies

This project is a monorepo. You need to install dependencies for both folders.

# Install Root dependencies
npm install

# Install Backend dependencies
cd BackEnd
npm install

# Install Frontend dependencies
cd ../FrontEnd
npm install


3. Environment Variables

Create a .env file in the BackEnd folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET=your_admin_secret_key


4. Run the App

Go back to the root folder and run:

npm run dev


This command uses concurrently to start both the Frontend (localhost:5173) and Backend (localhost:5000) simultaneously.

📂 Project Structure

ecommerce-fullstack-design/
├── BackEnd/             # Express API & Database Logic
│   ├── config/          # DB Connection
│   ├── controllers/     # Route Logic (Auth, Products)
│   ├── models/          # Mongoose Schemas
│   └── routes/          # API Endpoints
│
├── FrontEnd/            # React Client
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views (Home, Cart, Admin)
│   │   └── store/       # Zustand State (Auth, Cart)
│
└── package.json         # Root scripts for deployment


🔒 Admin Access

To test the Admin features locally:

Go to the Register page.

Check the "Register as Admin" box.

📄 License

This project is open-source and available under the MIT License.
