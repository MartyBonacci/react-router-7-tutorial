# React Router 7 Tutorial Project

## Standard Workflow (Follow Every Time)
1. **Start of conversation**: Always read PLANNING.md file to understand project context
2. **Check existing work**: Read TASKS.md to see what's already been done and what needs to be done
3. **Analyze and plan**: Think through the problem, read relevant files in the codebase, and write a detailed plan to TASKS.md with a list of todo items
4. **Get approval**: Before beginning work, check in with the user to verify the plan
5. **Execute incrementally**: 
   - Work on todo items one at a time
   - Mark each task as complete immediately after finishing it
   - Give a high-level explanation of changes made at each step
   - Keep all changes as simple as possible - every change should impact minimal code
6. **Document discoveries**: Add any newly discovered tasks to TASKS.md as you work
7. **Review completion**: Add a review section to TASKS.md with a summary of all changes made
8. **Provide testing instructions**: Give clear instructions for visually testing the changes using browser, API testing software (Insomnia/Postman), or other tools

## Project Overview
This is a React Router 7 tutorial project demonstrating the latest features and patterns of React Router v7. The project uses TypeScript, Vite, and includes a contacts management application with programmatic route configuration.

## Project Structure
```
/
├── app/
│   ├── routes/         # Route components
│   ├── layouts/        # Layout components (sidebar.tsx)
│   ├── data.ts         # Data management and API functions
│   ├── routes.ts       # Programmatic route configuration
│   ├── root.tsx        # Root component
│   └── app.css         # Global styles
├── public/             # Static assets
├── build/              # Build output (gitignored)
└── Configuration files
```

## Available Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run typecheck` - Generate types and run TypeScript checks

## Technology Stack
- React 19
- React Router 7.6.1
- TypeScript 5.7.2
- Vite 5.4.11
- Node.js >= 20.0.0

## Routing System
This project uses **programmatic route configuration** (not file-based routing):
- Routes are defined in `app/routes.ts` using RouteConfig
- Uses layout(), index(), and route() helper functions
- Sidebar layout wraps main content routes
- Separate about page outside the layout

## Key Features Implemented
- Programmatic routing with routes.ts configuration
- Contact management system (CRUD operations)
- Layout system with sidebar navigation
- TypeScript support with type generation
- Production-ready server setup
- Data loading and actions pattern

## Development Guidelines
1. Follow existing code patterns and conventions
2. Use React Router 7's data APIs for loaders and actions
3. Maintain TypeScript type safety
4. Test changes with both dev and build commands
5. Ensure Node.js version compatibility (>= 20.0.0)
6. Route configuration changes go in app/routes.ts, not file structure

## Testing Approach
Run the following commands to ensure code quality:
1. `npm run typecheck` - Verify TypeScript types
2. `npm run build` - Ensure production build works
3. Manual testing in development mode with `npm run dev`