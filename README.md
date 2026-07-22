# YOTAP Inventory Management System

A web-based Inventory Management System developed using **React.js**, **PHP**, **MySQL**, and **Bootstrap 5**. The system helps manage products, categories, and users through an easy-to-use dashboard.

---

## Features

### Authentication
- User Login
- User Registration (Staff only)
- Password Hashing
- Show/Hide Password
- Role-Based Access (Admin & Staff)

### Dashboard
- Dashboard Overview
- Navigation Sidebar
- Responsive Layout

### User Management (Admin)
- Add User
- Update User
- Delete User
- Search User
- Role Management (Admin/Staff)

### Product Management
- Add Product
- Update Product
- Delete Product
- Search Product

### Category Management
- Add Category
- Update Category
- Delete Category
- Search Category

---

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5
- CSS

### Backend
- PHP
- MySQL
- XAMPP

---

## Project Structure

```
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── css/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json

server/
│
├── api/
│   ├── login.php
│   ├── register.php
│   ├── users.php
│   ├── addUser.php
│   ├── updateUser.php
│   ├── deleteUser.php
│   ├── products.php
│   ├── addProduct.php
│   ├── updateProduct.php
│   ├── deleteProduct.php
│   ├── categories.php
│   ├── addCategory.php
│   ├── updateCategory.php
│   └── deleteCategory.php
│
├── config/
│   └── Database.php
│
└── database/
```

---

## Database

Create a MySQL database named:

```
yotap_system
```

### Tables

- users
- products
- categories

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/yotap-system.git
```

### 2. Install React Dependencies

```bash
cd client
npm install
```

### 3. Start React

```bash
npm run dev
```

### 4. Start XAMPP

- Apache
- MySQL

### 5. Import Database

Import the SQL file into phpMyAdmin.

---

## Default Admin Account

Username

```
admin
```

Password

```
admin123
```

*(Change this according to your database.)*

---

## Screenshots

You may add screenshots here.

Example:

```
screenshots/
    login.png
    dashboard.png
    users.png
    products.png
    categories.png
```

---

## Future Improvements

- Product Image Upload
- Reports
- Sales Module
- Activity Logs
- Export to Excel
- Export to PDF
- Inventory Statistics
- Dark Mode

---

## Developers

Developed by:

**YOTAP Development Team**

---

## License

This project is intended for educational purposes.