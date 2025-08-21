# ShiningPaint Manufacturing Admin Dashboard - Backend API

A comprehensive Node.js backend API for the ShiningPaint Manufacturing Admin Dashboard, built with Express.js, MySQL, and JWT authentication.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user CRUD operations with role management
- **Product Management**: Full product catalog with categories, inventory tracking
- **Order Management**: Order processing, status tracking, and inventory updates
- **Customer Management**: Customer profiles and order history
- **Analytics & Reporting**: Dashboard statistics and business insights
- **File Upload**: Image and document upload functionality
- **Security**: Rate limiting, input validation, and secure password hashing
- **Database**: MySQL with connection pooling and transaction support

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ShiningPaint-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MySQL Database**
   - Create a MySQL database named `shiningpaint_db`
   - Update the database credentials in `.env` file

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env` (if exists) or use the provided `.env`
   - Update the following variables:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=shiningpaint_db
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     JWT_SECRET=your_super_secret_jwt_key
     ```

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Setup

The application will automatically:
- Create all necessary database tables
- Seed the database with initial data (in development mode)

### Default Users Created:
- **Admin**: admin@shiningpaint.com / admin123
- **Manager**: manager@shiningpaint.com / manager123
- **Employee**: employee@shiningpaint.com / employee123

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update user profile
- `PUT /auth/password` - Change password
- `POST /auth/logout` - Logout user

### User Management (Admin/Manager only)
- `GET /users` - Get all users
- `GET /users/:id` - Get single user
- `POST /users` - Create user (Admin only)
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin only)
- `POST /users/:id/reset-password` - Reset user password (Admin only)

### Product Management
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (Admin/Manager)
- `PUT /products/:id` - Update product (Admin/Manager)
- `DELETE /products/:id` - Delete product (Admin only)

### Order Management
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get single order
- `POST /orders` - Create order
- `PUT /orders/:id/status` - Update order status (Admin/Manager)

### Customer Management
- `GET /customers` - Get all customers
- `GET /customers/:id` - Get single customer
- `POST /customers` - Create customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer (Admin only)

### Analytics & Dashboard
- `GET /analytics/dashboard` - Dashboard statistics
- `GET /analytics/recent-orders` - Recent orders
- `GET /analytics/top-products` - Top selling products
- `GET /analytics/low-stock` - Low stock products
- `GET /analytics/sales-chart` - Sales chart data (Admin/Manager)
- `GET /analytics/order-status` - Order status distribution (Admin/Manager)

### File Upload
- `POST /upload/single` - Upload single file
- `POST /upload/multiple` - Upload multiple files
- `GET /upload/:fileName` - Get file info
- `DELETE /upload/:fileName` - Delete file (Admin/Manager)

## 🔐 Authentication

All API endpoints (except auth endpoints) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

- **Admin**: Full access to all features
- **Manager**: Access to most features except user management
- **Employee**: Limited access to basic operations

## 📊 Database Schema

### Main Tables:
- `users` - User accounts and authentication
- `product_categories` - Product categorization
- `products` - Product catalog
- `customers` - Customer information
- `orders` - Order records
- `order_items` - Order line items
- `inventory_transactions` - Stock movement tracking

## 🛡️ Security Features

- **Password Hashing**: bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Configurable cross-origin requests
- **File Upload Security**: File type and size validation

## 🚦 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error details"]
}
```

## 📈 Performance Features

- **Connection Pooling**: MySQL connection pooling for better performance
- **Compression**: Response compression middleware
- **Caching Headers**: Appropriate cache headers for static files
- **Transaction Support**: Database transactions for data consistency

## 🔧 Development

### Available Scripts:
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Environment Variables:
See `.env` file for all configurable options including:
- Database configuration
- JWT settings
- File upload limits
- Rate limiting
- Email configuration (for future features)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
