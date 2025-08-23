# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (includes copying \_redirects to dist)
- `npm run lint` - Lint code with ESLint
- `npm run preview` - Preview production build locally

## Project Overview

This is a **commercial proposal management platform** built with React TypeScript and Vite. The application provides users with an intuitive Kanban-style board interface for creating, managing, and tracking business proposals through different stages of the sales pipeline.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast builds and HMR
- **Styling**: TailwindCSS v4 with custom design system
- **State Management**: Zustand for lightweight, performant global state
- **Routing**: React Router v7 with nested layouts and route guards
- **Drag & Drop**: @dnd-kit for Kanban board functionality
- **Content Editor**: @measured/puck for rich block-based content creation
- **API Client**: Axios with retry logic for resilient API communication
- **Node.js**: Version 22.17.0 (specified in package.json engines)

## Architecture Overview

### State Management Strategy

The application uses **Zustand stores** for efficient global state management:

- `auth-state-store.ts` - Authentication state, JWT token management, user session data
- `board-store.ts` - Proposal board state, stage management, and Kanban operations

### Routing Structure

**React Router v7** with intelligent route organization:

- **AuthGuard component** protects private/public routes (currently disabled for development)
- **Route structure:**
    - **Public routes**: `/` (Landing), `/sign-in` (Authentication)
    - **Private routes**: `/proposals` (Kanban board), `/ia` (AI-powered features)

### Feature-Based Architecture

- **Feature-based folder structure** under `src/pages/private/` and `src/pages/public/`
- **Services layer** for clean API communication with error handling
- **Interface definitions** for comprehensive TypeScript type safety
- **Custom hooks** for reusable business logic (`use-session`, `use-mobile`, etc.)

### UI/UX Design System

- **TailwindCSS v4** with custom configuration and design tokens
- **CSS variables** for consistent theming with light/dark mode support
- **Custom component library** following design system principles
- **Mobile-responsive** design with dedicated mobile detection hooks

## Core Features

### Proposal Management System

- **Kanban Board Interface**: Drag-and-drop proposal management using @dnd-kit
- **Stage-based Workflow**: Move proposals through customizable pipeline stages
- **Real-time Updates**: Synchronized state management across board operations

### Block Editor Integration

- **@measured/puck** for rich content creation within proposals
- **Modular content blocks** for flexible proposal formatting
- **WYSIWYG editing experience** for non-technical users

### Authentication & Security

- **JWT token-based authentication** with automatic refresh
- **localStorage token management** under "x-access-token" key
- **Route protection** with AuthGuard component
- **Session persistence** across browser refreshes

## Build & Development Configuration

### Vite Configuration

- **SWC** for ultra-fast compilation and Hot Module Replacement
- **Path alias** `@/` points to `src/` directory for clean imports
- **SVGR plugin** for importing SVGs as React components
- **Production optimizations** with automatic asset copying

### API Integration

- **Axios with retry logic** for resilient API communication
- **Base API configuration** in `src/config/api-config.ts`
- **Centralized error handling** and request/response interceptors
- **Token attachment** for authenticated requests

## Development Guidelines

When working with this React frontend:

### Code Organization

1. **Feature-based structure** - Group related components, hooks, and services together
2. **Custom hooks** - Extract reusable logic into hooks following React patterns
3. **TypeScript interfaces** - Define clear contracts for all data structures
4. **Service layer separation** - Keep API logic separate from UI components

### State Management

1. **Zustand stores** - Use for global state that needs to be shared across components
2. **Local state** - Use React useState for component-specific state
3. **Store slicing** - Keep stores focused and avoid god objects
4. **State normalization** - Structure data for efficient updates and lookups

### Styling Approach

1. **TailwindCSS utilities** - Prefer utility classes over custom CSS
2. **Design system consistency** - Use CSS variables and design tokens
3. **Responsive design** - Mobile-first approach with responsive utilities
4. **Component composition** - Build complex UIs from simple, reusable components

### Drag & Drop Implementation

1. **@dnd-kit patterns** - Follow established patterns for sortable lists and droppable areas
2. **Accessibility** - Ensure keyboard navigation and screen reader support
3. **Performance optimization** - Use proper keys and avoid unnecessary re-renders
4. **State synchronization** - Keep drag operations in sync with backend

### Performance Considerations

1. **React.memo** - Memoize components that receive stable props
2. **useMemo/useCallback** - Optimize expensive calculations and stable references
3. **Code splitting** - Use dynamic imports for route-based code splitting
4. **Bundle analysis** - Monitor bundle size and optimize imports

## Integration with Backend

This frontend connects to a Node.js API following Clean Architecture:

- **RESTful endpoints** for CRUD operations on proposals
- **JWT authentication** for secure API access
- **Real-time synchronization** between frontend board state and backend data
- **Error boundary handling** for graceful API error recovery

The complete system enables users to create, organize, and manage commercial proposals through an intuitive drag-and-drop interface while maintaining data consistency and security.
