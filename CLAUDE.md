# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Flexigom** is an MVP for tyre/wheel services with a Strapi CMS backend and React frontend. The project focuses on fast product iteration and reliable checkout flow.

## Architecture

- **Monorepo structure**: `frontend/` (React) and `backend/` (Strapi CMS)
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS 4 + shadcn/ui + TanStack Query + React Router 7
- **Backend**: Strapi 5.23.1 + PostgreSQL + REST API
- **Package Manager**: pnpm

## Development Commands

### Frontend (`cd frontend/`)

- `pnpm dev` - Start development server (Vite)
- `pnpm build` - Build for production (runs `tsc -b && vite build`)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm tsc` - Run TypeScript type checking (`tsc --noEmit`)
- `pnpm format` - Format code with Prettier
- `pnpm pre-commit` - Run lint + typecheck + format

### Backend (`cd backend/`)

- `pnpm dev` or `pnpm develop` - Start Strapi in development mode
- `pnpm build` - Build Strapi admin panel
- `pnpm start` - Start Strapi in production mode
- `pnpm setup` - Copy environment example file

### Database (from backend directory)

- `pnpm db:start` - Start PostgreSQL Docker container
- `pnpm db:stop` - Stop PostgreSQL Docker container
- `pnpm db:restart` - Restart PostgreSQL Docker container
- `pnpm db:reset` - Reset database (removes volumes)
- `pnpm db:logs` - View PostgreSQL logs
- `pnpm db:shell` - Access PostgreSQL shell

## Development Workflow

1. **Dual terminal setup required**:

   - Terminal 1: `cd frontend && pnpm dev`
   - Terminal 2: `cd backend && pnpm dev`

2. **Type checking**: Always run `pnpm tsc` in frontend before committing

3. **Linting**: Run `pnpm lint` to check code quality

## Project Structure

### Frontend (`frontend/src/`)

- `features/` - Feature-based modules (auth, products, home)
  - `[feature]/hooks/` - TanStack Query hooks
  - `[feature]/services/` - API service functions
  - `[feature]/pages/` - Feature pages/routes
- `components/ui/` - shadcn/ui atomic components
- `components/` - Composed/complex components
- `lib/` - Utilities and configurations
  - `api.ts` - Axios client with interceptors
  - `utils.ts` - General utilities
- `types/` - TypeScript type definitions

### Backend (`backend/src/`)

- `api/` - Strapi API definitions (product, category)
- `extensions/` - Strapi extensions (documentation plugin)
- `admin/` - Admin panel customizations

## Key Technical Details

### API Client

- Configured in `frontend/src/lib/api.ts`
- Base URL: `VITE_API_BASE_URL` or `http://localhost:1337/api`
- Includes request/response interceptors with error handling
- 10-second timeout configured

### TypeScript Configuration

- **Strict mode enabled** in both frontend and backend
- **Path aliases**: `@/*` maps to `./src/*`
- Frontend uses project references (tsconfig.app.json, tsconfig.node.json)

### Data Fetching

- **TanStack Query** for server state management
- Feature-based hooks pattern: `use-[resource].tsx` in feature hooks
- Services pattern: `[resource]-service.ts` in feature services
- Types pattern: `[resource]-types.ts` in feature types
- Ever create a way to handle errors in the query and create her error boundary component.
- Ever create a way to handle loading states in the query and create her skeleton components.
- **Null Data Handling**: All sections should hide (return `null`) when data is empty/null, following the pattern in `featured-products-section.tsx`. Sections should not render empty states when no data is available.

### UI System

- **TailwindCSS** for styling
- **shadcn/ui** component library
- Components follow atomic design principles

### Environment Variables

- Use `VITE_` prefix for frontend environment variables
- Default API base URL: `http://localhost:1337/api`

## Git Workflow

- **Branch naming**: `feature/<ticket>-short-desc`, `fix/<ticket>-...`
- **Commit format**: Conventional Commits (feat:, fix:, chore:, etc.)
- **Main branch**: `main`
- Always run typecheck and lint before committing

## Database

- **PostgreSQL** via Docker Compose
- Connection configured via `.env` file in backend
- Database name: `flexigom`
- User: `flexigom_user`

## Common Development Tasks

### Adding a new feature

1. Create feature directory in `frontend/src/features/[feature-name]/`
2. Add `hooks/`, `services/`, `pages/` subdirectories
3. Implement service functions using the API client
4. Create TanStack Query hooks
5. Build pages using existing UI components

### Adding API endpoints

1. Create content types in Strapi admin panel
2. Configure permissions in Users & Permissions plugin
3. Add TypeScript types in frontend
4. Create service functions and hooks

### Troubleshooting

- Check both terminals are running (frontend + backend)
- Verify database is running: `pnpm db:logs`
- Check environment variables are set correctly
- Run `pnpm tsc` to catch TypeScript errors early

### About this project

Flexigom is an MVP for bed, mattress and pillow shop with a Strapi CMS backend and React frontend. The project focuses on fast product iteration and reliable checkout flow.

## SEO Implementation Status

### Completed SEO Features

1. **React Helmet Async** - Installed and configured for dynamic meta tag management
2. **SEO Infrastructure** - Created comprehensive SEO utilities and components:
   - `src/lib/seo/` - SEO utilities, constants, and type definitions
   - `src/components/seo/` - SEOHead and StructuredData components
   - Full TypeScript support with proper interfaces

3. **Basic SEO Setup** - Updated main `index.html` with:
   - Spanish Argentina locale (`es-AR`)
   - Geo-targeting for Tucumán
   - Basic meta tags with local business focus
   - Open Graph and Twitter Card base tags

4. **Component-Level SEO** - Implemented dynamic SEO for:
   - **Homepage**: Local business schema, website schema, organization schema
   - **Products page**: Dynamic meta based on category filters, breadcrumb schema
   - **Product detail pages**: Product schema, breadcrumb schema, optimized meta

5. **Structured Data (JSON-LD)** - Complete implementation:
   - Local business markup with Tucumán location
   - Product schema with pricing and availability
   - Organization schema with contact details
   - Breadcrumb navigation schema
   - Website search functionality schema

6. **Technical SEO Files**:
   - `public/robots.txt` - Optimized for search engine crawling
   - `public/sitemap.xml` - Basic sitemap with main pages

### SEO Strategy & Positioning

**Target Keywords (vs Competitor Hipercolchonerias):**
- Primary: "colchones Tucumán", "sommiers Tucumán", "ropa de cama Tucumán"
- Local: "colchonería Flexigom", "tienda de colchones San Miguel de Tucumán"
- Long-tail: "donde comprar colchones en Tucumán", "mejores colchones Tucumán"

**Competitive Positioning:**
- Emphasize **20+ years of experience** (vs competitor's 40 years)
- Focus on **personalized service** and **family business values**
- Highlight **quality over speed** approach
- Strong **local Tucumán specialization**

### Remaining SEO Tasks

1. **Image Alt Text Optimization** (In Progress)
   - ✅ Category cards - enhanced with location and descriptive keywords
   - ⏳ Product cards - improve fallback alt text
   - ⏳ Hero section images - verify SEO optimization
   - ⏳ Payment method icons - add descriptive alt text

2. **Code Quality Fixes** (High Priority)
   - Fix React Hook violations in `product-detail-page.tsx`
   - Resolve TypeScript errors for product schema
   - Move useMemo hooks before early returns

3. **Testing & Validation**
   - Test dynamic meta tag rendering
   - Validate structured data with Google's Rich Results Test
   - Check mobile-friendliness
   - Verify page load speeds
   - Test social media sharing (Open Graph)

4. **Advanced SEO Enhancements** (Future)
   - Dynamic sitemap generation based on products
   - FAQ schema from existing FAQ section
   - Review/rating schema for testimonials
   - Local business hours schema optimization
   - Image optimization and WebP conversion

### SEO Configuration Files

Key files for SEO management:
- `src/lib/seo/constants.ts` - Business info, keywords, default configs
- `src/lib/seo/utils.ts` - SEO generation functions
- `src/lib/seo/structured-data.ts` - Schema.org implementations
- `src/components/seo/seo-head.tsx` - Main SEO component

### Next Steps for Continuation

1. Fix TypeScript/React errors in product detail page
2. Complete image alt text optimization
3. Run comprehensive SEO testing
4. Validate all structured data implementations
5. Consider dynamic sitemap based on product catalog
