# Cleanstack

A minimal, modern software development studio website.

**Stack:** React + TypeScript + Vite · Tailwind CSS · Framer Motion · Node.js + Express · PostgreSQL · Prisma

---

## Project Structure

```
/client   → React Vite frontend
/server   → Express API backend
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL running locally (or use Docker)

### 1. Environment variables

```bash
# Server
cp server/.env.example server/.env
# Edit DATABASE_URL, PORT, CLIENT_URL

# Client
cp client/.env.example client/.env
# Edit VITE_API_URL
```

### 2. Install dependencies

```bash
# Root
npm install

# Client
cd client && npm install

# Server
cd server && npm install
```

### 3. Database setup

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
