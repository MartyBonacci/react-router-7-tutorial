# React Router 7 Contacts Tutorial

A modern, mobile-first contacts management application built with React Router 7, TypeScript, and Drizzle ORM with Neon PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- Neon account (free at [neon.tech](https://neon.tech))

### Setup

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Create Neon database**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy your connection string from the dashboard

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and replace `DATABASE_URL` with your Neon connection string:
   ```
   DATABASE_URL=postgresql://username:password@host.neon.tech/neondb?sslmode=require
   ```

4. **Run database migration**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Management

### Schema Changes
```bash
# Generate migration files
npm run db:generate

# Apply migrations
npm run db:migrate

# Push schema changes directly
npm run db:push

# Open Drizzle Studio for database management
npm run db:studio
```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript checks |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema changes |
| `npm run db:studio` | Open database studio |

## 📱 Features

- **Mobile-first responsive design** with Tailwind CSS
- **Type-safe database operations** with Drizzle ORM
- **Server-side rendering** with React Router 7
- **Real-time search** functionality
- **Contact management** (CRUD operations)
- **Responsive navigation** with mobile menu
- **PostgreSQL database** with Neon

## 🏗️ Architecture

- **Frontend**: React 19 + React Router 7
- **Styling**: Tailwind CSS (mobile-first)
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM (TypeScript-first)
- **Validation**: Zod schemas
- **Build**: Vite

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Required environment variables:
- `DATABASE_URL`: Neon PostgreSQL connection string
- `NODE_ENV`: Set to `production` for production builds

## 📁 Project Structure

```
├── app/
│   ├── routes/          # Route components
│   ├── layouts/         # Layout components
│   ├── lib/            # Utilities and database config
│   └── data.ts         # Database operations
├── db/
│   ├── schema.ts       # Drizzle schema
│   └── migrations/     # Generated migration files
├── public/            # Static assets
└── .env.example       # Environment template
```

## 🔧 Development Tips

- Use `npm run db:studio` to explore your database with Drizzle Studio
- All database operations are type-safe with full TypeScript support
- Mobile-first design - test on various screen sizes
- The app automatically reconnects to Neon database on restart

## 🆘 Troubleshooting

**Database connection issues:**
- Verify your `DATABASE_URL` is correct
- Check if your Neon project is active
- Ensure SSL mode is enabled (`?sslmode=require`)

**TypeScript errors:**
- Run `npm run typecheck` to identify issues
- Check database schema matches your types

**Build failures:**
- Ensure Node.js 20+ is installed
- Check all environment variables are set