# YOTAP-SYSTEM

A comprehensive **YOTAP Management System** built with a modern tech stack. The system provides user management, product management, category management, authentication, and an admin dashboard.

## 🚀 Features

- 🔐 **User Authentication** - Login & Register functionality
- 👤 **User Management** - Complete CRUD operations for users
- 📦 **Product Management** - Add, edit, delete, and view products
- 🗂️ **Category Management** - Organize products by categories
- 📊 **Admin Dashboard** - Real-time analytics and statistics
- 🔍 **Search Functionality** - Quick product and user search
- 🎨 **Responsive UI** - Works seamlessly on all devices
- 🗄️ **Database Integration** - MySQL with secure connections

## 🛠️ Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Fast build tool
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **CSS3** - Styling

### Backend
- **PHP** - Server-side language
- **MySQL** - Database
- **XAMPP** - Local development environment

## 📁 Project Structure

```
YOTAP-SYSTEM/
├── client/                     # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── css/                # Stylesheets
│   │   ├── services/           # API calls
│   │   ├── assets/             # Images and icons
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                 # Static files
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                     # PHP Backend Application
│   ├── api/                    # API endpoints
│   │   ├── login.php
│   │   ├── register.php
│   │   ├── users.php
│   │   ├── products.php
│   │   ├── categories.php
│   │   ├── dashboard.php
│   │   └── ... (other endpoints)
│   ├── config/
│   │   └── Database.php        # Database configuration
│   ├── controllers/            # Business logic
│   ├── models/                 # Data models
│   └── index.php
│
├── package.json                # Root dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js 14+ and npm
- XAMPP (for local PHP development)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/castanedajohnclarence7-ai/YOTAP-SYSTEM.git
cd YOTAP-SYSTEM
```

#### 2. Backend Setup (PHP + MySQL)
```bash
# Navigate to server directory
cd server

# Configure database connection
# Edit config/Database.php with your MySQL credentials
```

#### 3. Frontend Setup (React + Vite)
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 4. Backend Setup
```bash
# Place the server folder in your XAMPP htdocs directory
# C:\xampp\htdocs\yotap-system\server\

# Start XAMPP and enable Apache + MySQL
# Access the backend at http://localhost/yotap-system/server/
```

## 📝 API Endpoints

### Authentication
- `POST /api/login.php` - User login
- `POST /api/register.php` - User registration

### Users
- `GET /api/users.php` - Get all users
- `POST /api/addUser.php` - Add new user
- `POST /api/updateUser.php` - Update user
- `POST /api/deleteUser.php` - Delete user

### Products
- `GET /api/products.php` - Get all products
- `POST /api/addProduct.php` - Add new product
- `POST /api/updateProduct.php` - Update product
- `POST /api/deleteProduct.php` - Delete product

### Categories
- `GET /api/categories.php` - Get all categories
- `POST /api/addCategory.php` - Add new category
- `POST /api/updateCategory.php` - Update category
- `POST /api/deleteCategory.php` - Delete category

### Dashboard
- `GET /api/dashboard.php` - Get dashboard statistics

## 🔧 Configuration

### Database Configuration
Edit `server/config/Database.php`:
```php
private $host = 'localhost';
private $db_name = 'yotap_system';
private $db_user = 'root';
private $db_password = '';
```

### API Base URL
Edit `client/src/services/api.js` to match your backend URL:
```javascript
const API_BASE_URL = 'http://localhost/yotap-system/server/api/';
```

## 📦 Build for Production

### Frontend
```bash
cd client
npm run build
```

### Backend
- Copy the `server` folder to your production PHP server
- Update database configuration for production environment

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Clarence Castaneda**
- GitHub: [@castanedajohnclarence7-ai](https://github.com/castanedajohnclarence7-ai)

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Add email notifications
- [ ] Implement role-based access control
- [ ] Add export to PDF/CSV functionality
- [ ] Mobile app (React Native)
- [ ] Advanced reporting features
- [ ] API documentation (Swagger/OpenAPI)

---

Made with ❤️ by the YOTAP Team
