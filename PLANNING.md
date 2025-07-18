# Planning Document
## React Router 7 Contacts Management Application

### Vision Statement
Build a modern, production-ready contacts management application that serves as both a learning resource for React Router 7 and a practical example of full-stack development best practices. The application will demonstrate responsive design, type-safe database operations, robust validation, and containerized deployment while maintaining simplicity and code clarity.

### Core Principles
1. **Mobile-First Design** - Every feature must work seamlessly on mobile devices
2. **Type Safety** - End-to-end type safety from database to UI
3. **Developer Experience** - Easy setup, clear code structure, and excellent tooling
4. **Production Ready** - Implement real-world patterns and best practices
5. **Educational Value** - Code should be clear and well-documented for learning

## Architecture Overview

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Browser/UI    │────▶│ React Router 7  │────▶│  PostgreSQL     │
│  (Tailwind CSS) │◀────│   Application   │◀────│   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         │                       │                        │
    Validates with          Validates with          Managed by
        Zod                    Zod                  Drizzle ORM
```

### Application Layers

#### 1. Presentation Layer
- **React Components** - UI components with Tailwind styling
- **React Router 7** - Routing, loaders, and actions
- **Form Handling** - Client-side validation with Zod
- **Responsive Design** - Mobile-first with Tailwind breakpoints

#### 2. Application Layer
- **Route Handlers** - Data loading and mutations
- **Validation Schemas** - Shared Zod schemas
- **Business Logic** - Contact management operations
- **Error Handling** - Consistent error boundaries

#### 3. Data Layer
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Relational data storage
- **Migrations** - Version-controlled schema changes
- **Connection Management** - Pooling and optimization

### Folder Structure
```
/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   └── forms/          # Form-specific components
│   ├── routes/             # Route components
│   ├── layouts/            # Layout components
│   ├── lib/                # Utilities and helpers
│   │   ├── db/            # Database configuration
│   │   ├── schemas/       # Zod schemas
│   │   └── utils/         # Helper functions
│   ├── styles/             # Global styles
│   └── types/              # TypeScript types
├── db/
│   ├── migrations/         # SQL migrations
│   └── schema.ts          # Drizzle schema
├── docker/                 # Docker configurations
├── public/                # Static assets
└── tests/                 # Test files
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **React Router 7.6.1** - Routing and data management
- **TypeScript 5.7.2** - Type safety
- **Tailwind CSS 3.x** - Utility-first styling
- **Zod** - Runtime validation
- **React Hook Form** (optional) - Form management

### Backend
- **Node.js 20+** - Runtime environment
- **Vite 5.4.11** - Build tool and dev server
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL 16** - Relational database
- **Zod** - API validation

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL** - Database container
- **Node** - Application container

### Development Tools
- **TypeScript** - Static typing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **PostgreSQL Client** - Database management

## Required Tools List

### Prerequisites
1. **Node.js** (v20.0.0 or higher)
   - Required for running the application
   - Install from: https://nodejs.org/

2. **npm** or **pnpm**
   - Package manager (comes with Node.js)
   - For pnpm: `npm install -g pnpm`

3. **Docker Desktop**
   - For containerized development
   - Install from: https://www.docker.com/products/docker-desktop/

4. **Git**
   - Version control
   - Install from: https://git-scm.com/

### Development Environment
1. **VS Code** (recommended)
   - Extensions:
     - Tailwind CSS IntelliSense
     - ESLint
     - Prettier
     - TypeScript and JavaScript
     - Docker
     - PostgreSQL

2. **Database Client** (choose one)
   - pgAdmin 4
   - TablePlus
   - DBeaver
   - VS Code PostgreSQL extension

3. **API Testing** (choose one)
   - Postman
   - Insomnia
   - Thunder Client (VS Code)
   - Browser DevTools

### Project Dependencies
```json
{
  "dependencies": {
    "@react-router/node": "^7.6.1",
    "@react-router/serve": "^7.6.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.6.1",
    "drizzle-orm": "latest",
    "postgres": "latest",
    "zod": "latest",
    "tailwindcss": "latest"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.1",
    "drizzle-kit": "latest",
    "typescript": "^5.7.2",
    "vite": "^5.4.11",
    "postcss": "latest",
    "autoprefixer": "latest"
  }
}
```

## Development Phases

### Phase 1: Mobile Responsive UI (Current)
- Install and configure Tailwind CSS
- Convert existing styles to Tailwind
- Implement responsive navigation
- Make all components mobile-friendly
- Test on various devices

### Phase 2: Database Integration
- Set up Docker Compose
- Configure PostgreSQL container
- Install and configure Drizzle ORM
- Create database schema
- Implement migrations

### Phase 3: API Layer
- Replace in-memory storage with database
- Implement CRUD operations with Drizzle
- Add error handling
- Create API validation with Zod

### Phase 4: Form Validation
- Create Zod schemas for all forms
- Implement client-side validation
- Add server-side validation
- Create error display components

### Phase 5: Production Readiness
- Add comprehensive error handling
- Implement logging
- Performance optimization
- Security hardening
- Documentation

## Key Design Decisions

### Why These Technologies?

1. **Tailwind CSS**
   - Rapid development with utility classes
   - Consistent design system
   - Excellent responsive utilities
   - Small production bundle size

2. **PostgreSQL + Drizzle**
   - Type-safe database queries
   - Excellent TypeScript integration
   - Lightweight and performant
   - Great developer experience

3. **Docker Compose**
   - Consistent development environment
   - Easy setup for new developers
   - Production-like local environment
   - Isolated dependencies

4. **Zod**
   - Runtime type validation
   - Excellent TypeScript inference
   - Reusable schemas
   - Clear error messages

### Performance Considerations
- Lazy load routes
- Optimize database queries
- Implement proper caching
- Use React Router's data patterns
- Minimize bundle size

### Security Considerations
- Input validation at all layers
- SQL injection prevention via Drizzle
- XSS prevention in React
- Environment variable management
- CORS configuration

## Success Metrics
1. **Performance**
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3s
   - Lighthouse score > 90

2. **User Experience**
   - Works on devices 320px+
   - All forms validate properly
   - Clear error messages
   - Smooth interactions

3. **Developer Experience**
   - Setup time < 5 minutes
   - Clear documentation
   - Type safety throughout
   - Hot reload working

4. **Code Quality**
   - 100% TypeScript
   - No any types
   - Consistent formatting
   - Comprehensive error handling