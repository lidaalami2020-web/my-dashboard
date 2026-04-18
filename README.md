# ForexDesk — Account Manager Dashboard

A full-stack web dashboard for Forex account managers to manage clients, deposits, accounts, and follow-ups.

## Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | HTML, CSS, Vanilla JS (fetch API)       |
| Backend  | Node.js, Express                        |
| Database | PostgreSQL                              |
| ORM      | Prisma                                  |
| Auth     | bcrypt (password hashing)               |

## Project Structure

```
my-dashboard/
├── index.html          # Login page
├── signup.html         # Registration page
├── dashboard.html      # Main dashboard (protected)
├── style.css
└── backend/
    ├── index.js        # Express server entry point
    ├── controllers/
    │   ├── authController.js
    │   ├── clientController.js
    │   └── userController.js
    ├── routes/
    │   ├── auth.js
    │   ├── clients.js
    │   └── users.js
    └── prisma/
        ├── schema.prisma
        └── migrations/
```

## API Endpoints

| Method | Endpoint                | Description         |
|--------|-------------------------|---------------------|
| POST   | /api/auth/register      | Register a new user |
| POST   | /api/auth/login         | Login               |
| GET    | /api/clients            | List all clients    |
| POST   | /api/clients            | Create a client     |
| PUT    | /api/clients/:id        | Update a client     |
| DELETE | /api/clients/:id        | Delete a client     |

## Running Locally

### Prerequisites

- Node.js v18+
- PostgreSQL running locally

### 1. Clone the repo

```bash
git clone <repo-url>
cd my-dashboard
```

### 2. Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your database credentials.

### 3. Create the PostgreSQL database and user

```sql
CREATE USER your_db_user WITH PASSWORD 'your_password' CREATEDB;
CREATE DATABASE dashboard_db OWNER your_db_user;
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO your_db_user;
```

### 4. Install dependencies

```bash
cd backend
npm install
```

### 5. Run database migrations

```bash
npx prisma migrate deploy
```

### 6. Start the backend server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

### 7. Open the frontend

Open `index.html` directly in your browser, or serve the root folder with any static file server.

## Environment Variables

See `backend/.env.example` for all required variables.
