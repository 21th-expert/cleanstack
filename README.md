# Cleanstack

A modern, full-stack web application for showcasing services, projects, and team members. Built with React, TypeScript, Express, and PostgreSQL.

## Features

- **Admin Panel**: Manage team members, company values, services, and projects
- **Public Pages**: Responsive About, Services, Projects, and Contact pages
- **Authentication**: Secure admin login with JWT
- **File Uploads**: Direct photo uploads for team members
- **Dark/Light Theme**: Automatic theme support
- **Responsive Design**: Mobile-first with Tailwind CSS

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Router (routing)

### Backend
- Node.js + Express
- TypeScript
- Prisma (ORM)
- PostgreSQL (database)
- JWT (authentication)
- Nodemailer (email)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cleanstack.git
cd cleanstack
```

2. Install dependencies:
```bash
npm install
npm --prefix client install
npm --prefix server install
```

### Environment Setup

1. Copy environment files:
```bash
cp server/.env.example server/.env
```

2. Update `server/.env` with your values:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/cleanstack"
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-password"
CLIENT_URL="http://localhost:5173"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Database Setup

1. Start PostgreSQL and create database:
```sql
CREATE DATABASE cleanstack;
```

2. Run migrations:
```bash
npm --prefix server run db:migrate
```

3. Seed initial data:
```bash
npm --prefix server run db:seed
```

### Running the Application

1. Start the server:
```bash
npm --prefix server run dev
```

2. Start the client (in another terminal):
```bash
npm --prefix client run dev
```

3. Open [http://localhost:5173](http://localhost:5173)

### Admin Access

- Visit `/admin/login`
- Use the credentials from your `.env` file

## Scripts

### Root
- `npm install` - Install all dependencies

### Client
- `npm --prefix client run dev` - Start development server
- `npm --prefix client run build` - Build for production
- `npm --prefix client run preview` - Preview production build

### Server
- `npm --prefix server run dev` - Start development server with hot reload
- `npm --prefix server run build` - Build TypeScript
- `npm --prefix server run start` - Start production server
- `npm --prefix server run db:migrate` - Run database migrations
- `npm --prefix server run db:generate` - Generate Prisma client
- `npm --prefix server run db:seed` - Seed database

## Project Structure

```
cleanstack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── api/            # API client
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── lib/            # Utilities
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── docker-compose.yml      # Docker setup
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

```bash
cd server

# Run migrations
node_modules\.bin\prisma migrate dev --name init

# Seed with sample data
npm run db:seed
```

### 4. Run in development

```bash
# From root — starts both client and server
npm run dev

# Or individually:
cd server && npm run dev   # http://localhost:4000
cd client && npm run dev   # http://localhost:5173
```

---

## Docker (Production)

```bash
docker-compose up --build
```

- Frontend: http://localhost
- API: http://localhost:4000

---

## API Endpoints

| Method | Path            | Description              |
|--------|-----------------|--------------------------|
| GET    | /api/services   | List all services        |
| GET    | /api/projects   | List all projects        |
| POST   | /api/contact    | Submit a contact message |
| GET    | /api/health     | Health check             |

### POST /api/contact body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I have a project idea..."
}
```

---

## Pages

| Route       | Page     |
|-------------|----------|
| `/`         | Home     |
| `/services` | Services |
| `/projects` | Projects |
| `/about`    | About    |
| `/contact`  | Contact  |
