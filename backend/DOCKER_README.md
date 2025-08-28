# PostgreSQL Docker Setup for Flexigom Backend

This guide will help you run PostgreSQL in Docker while running Strapi locally for optimal development experience.

## 🚀 Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Setup environment:**
   ```bash
   pnpm setup
   ```
   This copies `env.example` to `.env` with development defaults.

3. **Start PostgreSQL database:**
   ```bash
   pnpm db:start
   ```

4. **In the same terminal or new one, start Strapi locally:**
   ```bash
   pnpm dev
   ```

5. **Access your applications:**
   - Backend (Strapi Admin): http://localhost:1337/admin
   - Backend API: http://localhost:1337/api
   - PostgreSQL: localhost:5432

## 📋 Available Scripts

### Database Management (PostgreSQL in Docker)
- `pnpm db:start` - Start PostgreSQL database
- `pnpm db:stop` - Stop PostgreSQL database
- `pnpm db:restart` - Restart PostgreSQL database
- `pnpm db:logs` - View PostgreSQL logs
- `pnpm db:reset` - Reset PostgreSQL database (⚠️ removes all data!)
- `pnpm db:shell` - Access PostgreSQL shell

### Strapi Commands (Local Development)
- `pnpm dev` - Start Strapi in development mode
- `pnpm start` - Start Strapi in production mode
- `pnpm build` - Build Strapi admin panel

### Setup
- `pnpm setup` - Copy environment template to .env

## 🐳 Docker Services

### PostgreSQL Database Only
- **Build:** Custom image from `postgres.Dockerfile`
- **Base Image:** `postgres:15-alpine`
- **Port:** 5432 (configurable via `DATABASE_PORT`)
- **Database:** `flexigom` (configurable via `DATABASE_NAME`)
- **Volume:** `postgres_data` for data persistence
- **Features:** Development logging enabled, health checks

## 💻 Local Development

### Strapi Backend (Runs Locally)
- **Development Server:** Native Strapi development mode
- **Port:** 1337 (configurable via `PORT`)
- **Database Connection:** Connects to Docker PostgreSQL on localhost:5432
- **Hot Reload:** Full Strapi development experience
- **Why Local?** Faster development, easier debugging, native file watching

## ⚙️ Environment Variables

Edit `.env` file to customize:

```bash
# Database Configuration (Docker PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=flexigom
DATABASE_USERNAME=flexigom_user
DATABASE_PASSWORD=flexigom_password
DATABASE_SSL=false

# Strapi Configuration (CHANGE IN PRODUCTION!)
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=key1,key2,key3,key4

# Strapi Server
HOST=0.0.0.0
PORT=1337
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   pnpm docker:stop
   # Or change BACKEND_PORT in .env file
   ```

2. **Database connection issues:**
   ```bash
   pnpm docker:logs:postgres
   pnpm docker:db:reset  # ⚠️ This will delete all data!
   ```

3. **Strapi can't connect to database:**
   ```bash
   pnpm db:logs
   # Check if PostgreSQL is running
   pnpm db:start
   # Verify DATABASE_HOST=localhost in .env
   ```

### Fresh Start
If you encounter persistent issues:
```bash
pnpm db:reset
pnpm dev
```

## 📁 File Structure

```
backend/
├── docker-compose.yml          # PostgreSQL Docker orchestration
├── postgres.Dockerfile         # PostgreSQL container definition
├── Dockerfile                  # (Original Strapi Dockerfile - not used in this setup)
├── .dockerignore              # Docker ignore patterns
├── env.example                # Environment template
└── DOCKER_README.md           # This file
```

## 🌟 Best Practices

1. **Always use pnpm scripts** instead of direct Docker commands
2. **Keep `.env` file secure** and never commit it to version control
3. **Start database first** then Strapi: `pnpm db:start && pnpm dev`
4. **Monitor database logs** with `pnpm db:logs` if connection issues occur
5. **Reset database** if you encounter schema issues: `pnpm db:reset`

## 💻 Development Workflow

**Typical development session:**

1. **Start PostgreSQL:**
   ```bash
   cd backend
   pnpm db:start
   ```

2. **Start Strapi (same or new terminal):**
   ```bash
   pnpm dev
   ```

3. **Start frontend (in another terminal):**
   ```bash
   cd frontend
   echo 'VITE_API_URL=http://localhost:1337' > .env.local
   pnpm dev
   ```

**When done developing:**
```bash
pnpm db:stop  # Stop PostgreSQL when done
```

## 🆘 Need Help?

- Check if PostgreSQL is running: `docker ps`
- View database logs: `pnpm db:logs`
- Reset database: `pnpm db:reset`
- Access database shell: `pnpm db:shell`
- Test database connection: `pnpm db:shell` then `\l` to list databases

Happy coding! 🎉
