# ShiningPaint Manufacturing Admin Dashboard

A modern, responsive admin dashboard for ShiningPaint Manufacturing built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Secure login with JWT tokens
- 📊 **Dashboard Overview** - Key metrics and analytics at a glance
- 🛍️ **Product Management** - Complete CRUD operations for products
- 📦 **Order Management** - Track and manage customer orders
- 👥 **Customer Management** - Manage customer relationships
- 📈 **Analytics & Reporting** - Detailed insights and reports
- ⚙️ **Settings** - Application configuration
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean and intuitive interface
- 🔔 **Real-time Notifications** - Toast notifications for user feedback

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ShiningmPaint-Admin-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API configuration:
```env
VITE_API_URL=http://localhost:3000/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email**: admin@shiningpaint.com
- **Password**: admin123

## Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Layout components
├── pages/              # Page components
├── services/           # API services
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The dashboard is designed to work with a REST API. Update the `VITE_API_URL` environment variable to point to your backend API.

### Expected API Endpoints

- `POST /auth/login` - User authentication
- `GET /auth/me` - Get current user
- `GET /products` - Get products list
- `GET /orders` - Get orders list
- `GET /customers` - Get customers list
- And more...

## Features in Detail

### Authentication
- JWT-based authentication
- Persistent login state
- Protected routes
- Automatic token refresh

### Dashboard
- Key performance indicators (KPIs)
- Recent orders overview
- Top-selling products
- Revenue analytics

### Product Management
- Product catalog with search and filters
- Add/edit/delete products
- Image upload support
- Stock management
- Category management

### Order Management
- Order tracking and status updates
- Customer information
- Order details and line items
- Payment status tracking

### Responsive Design
- Mobile-first approach
- Collapsible sidebar
- Touch-friendly interface
- Optimized for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@shiningpaint.com or create an issue in the repository.
