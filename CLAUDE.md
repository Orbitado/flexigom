# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Flexigom** is an MVP for a bed, mattress and pillow shop with a Strapi CMS backend and React frontend. The project is a local business based in Tucumán, Argentina with 20+ years of experience. Focus: fast product iteration and reliable checkout flow with MercadoPago integration.

## Architecture

- **Monorepo structure**: `frontend/` (React) and `backend/` (Strapi CMS)
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS 4 + shadcn/ui + TanStack Query + React Router 7 + Zustand
- **Backend**: Strapi 5.23.1 + PostgreSQL + REST API + MercadoPago
- **Package Manager**: pnpm (required)

## Development Commands

### Frontend (`cd frontend/`)

- `pnpm dev` - Start development server (Vite)
- `pnpm build` - Build for production (runs `tsc -b && vite build`)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm tsc` - Run TypeScript type checking (`tsc --noEmit`)
- `pnpm format` - Format code with Prettier
- `pnpm pre-commit` - Run lint + typecheck + format (use before committing)

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
- `pnpm db:shell` - Access PostgreSQL shell (psql)

## Development Workflow

1. **Initial Setup**:
   ```bash
   # Backend setup
   cd backend
   pnpm install
   pnpm setup              # Creates .env from .env.example
   pnpm db:start          # Start PostgreSQL Docker container

   # Frontend setup
   cd frontend
   pnpm install
   # Create .env from .env.example and configure VITE_API_BASE_URL
   ```

2. **Dual terminal setup required**:
   - Terminal 1: `cd frontend && pnpm dev` (runs on http://localhost:5173)
   - Terminal 2: `cd backend && pnpm dev` (runs on http://localhost:1337)

3. **Pre-commit workflow**:
   ```bash
   cd frontend
   pnpm pre-commit    # Runs lint + tsc + format
   # OR run individually:
   pnpm lint          # Check for linting errors
   pnpm tsc           # TypeScript type checking
   pnpm format        # Format with Prettier
   ```

4. **Database management**:
   - Database runs in Docker container
   - Use `pnpm db:logs` to troubleshoot connection issues
   - Use `pnpm db:reset` to start fresh (destructive)

## Project Structure

### Frontend (`frontend/src/`)

```
src/
├── app/
│   ├── providers/          # React context providers (Query, Theme)
│   └── router/             # React Router 7 configuration
│       ├── routes.tsx      # Route definitions with lazy loading
│       ├── layouts/        # Layout components (RootLayout, AuthLayout)
│       └── loaders/        # Route data loaders
├── features/               # Feature-based modules
│   ├── home/
│   │   ├── components/     # Feature-specific components
│   │   ├── hooks/          # TanStack Query hooks
│   │   ├── pages/          # Feature pages/routes
│   │   ├── sections/       # Page sections
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript types
│   ├── products/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── skeletons/      # Loading skeleton components
│   ├── cart/
│   │   ├── store/          # Zustand cart store
│   │   └── ...
│   ├── checkout/
│   ├── auth/
│   └── pages/              # Static pages (contacto, faq, etc.)
├── components/
│   ├── ui/                 # shadcn/ui atomic components (30+)
│   ├── seo/                # SEO components (SEOHead, StructuredData)
│   └── ...                 # Composed components
├── lib/
│   ├── api.ts              # Axios client with interceptors
│   ├── utils.ts            # General utilities
│   └── seo/                # SEO utilities and schema generators
├── hooks/                  # Global hooks (useDebounce, useMobile, etc.)
└── types/                  # Global TypeScript type definitions
```

### Backend (`backend/src/`)

```
src/
├── api/
│   ├── product/            # Product content type
│   │   ├── content-types/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── category/
│   ├── order/
│   ├── featured-product/
│   ├── review/
│   ├── faq/
│   └── mercadopago/        # Payment integration
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── schemas/        # Zod validation schemas
│       └── utils/
├── extensions/             # Plugin extensions
└── admin/                  # Admin panel customizations
```

## Key Technical Details

### React Router 7

- **Lazy loading**: Routes use React.lazy() for code splitting
- **Route loaders**: Data prefetching via loader functions
- **Layouts**: RootLayout (main) and AuthLayout (authentication pages)
- **Error boundaries**: Per-route error handling
- **Spanish URLs**: Redirects like `/productos` → `/products`

Main routes:
- `/` - Homepage
- `/products` - Products listing with category filters
- `/products/product/:documentId` - Product detail page
- `/checkout` - Checkout flow
- `/checkout/success|failure|pending` - Payment result pages
- `/auth/login|register` - Authentication

### State Management

1. **TanStack Query** - Server state (API data)
   - Query keys pattern: `["resource", id]` or `["resource", filters]`
   - Default staleTime: 5 minutes for categories
   - Automatic background refetching
   - Error and loading states built-in

2. **Zustand** - Client state (shopping cart)
   - Store: `frontend/src/features/cart/store/use-cart-store.ts`
   - LocalStorage persistence
   - DevTools integration in development
   - Tax calculation (21% IVA Argentina)
   - Selector pattern for optimized renders

### Data Fetching Pattern

Feature-based organization follows this pattern:

1. **Service** (`*-service.ts`) - API calls using Axios
   ```typescript
   export const categoryService = {
     getCategories: () => api.get('/categories')
   }
   ```

2. **Hook** (`use-*.tsx`) - TanStack Query wrapper
   ```typescript
   export function useCategories() {
     return useQuery({
       queryKey: ['categories'],
       queryFn: categoryService.getCategories,
       staleTime: 5 * 60 * 1000
     })
   }
   ```

3. **Component** - Use hook in component
   ```typescript
   const { data, isLoading, error } = useCategories()
   if (isLoading) return <Skeleton />
   if (error) throw error  // Caught by error boundary
   return <CategoryList categories={data} />
   ```

**Important patterns**:
- Always create error boundary components for features
- Always create skeleton loading components
- **Null Data Handling**: Sections return `null` when data is empty (no empty state UI)

### API Client

- **Location**: `frontend/src/lib/api.ts`
- **Base URL**: `VITE_API_BASE_URL` environment variable (default: `http://localhost:1337/api`)
- **Timeout**: 10 seconds
- **Interceptors**:
  - Request: Logs requests in development
  - Response: Error handling with user-friendly messages by status code
- **Error handling**: Automatically converts API errors to readable messages

### Form Handling

- **React Hook Form** + **Zod** for validation
- Pattern: Define Zod schema → infer TypeScript type → use with useForm
- Example: Checkout form in `checkout/` feature
- Server-side validation errors are mapped to form fields

### Payment Integration (MercadoPago)

- **Frontend**: `@mercadopago/sdk-react` for checkout UI
- **Backend**: Custom MercadoPago API in `backend/src/api/mercadopago/`
- **Webhook handling**: Payment status updates
- **Environment variables required**:
  - `MERCADOPAGO_ACCESS_TOKEN`
  - `MERCADOPAGO_WEBHOOK_SECRET`
  - Success/failure/pending redirect URLs
- **Flow**: Cart → Checkout → MercadoPago → Success/Failure/Pending pages

### Invoice Integration (Dux Software)

- **Backend**: Custom Dux Software API in `backend/src/api/dux-software/`
- **Purpose**: Automatic invoice generation after payment approval
- **Trigger**: MercadoPago webhook when `payment_status === 'approved'`
- **Environment variables required**:
  - `DUX_API_BASE_URL` - Dux API endpoint (default: https://erp.duxsoftware.com.ar/WSERP/rest/services)
  - `DUX_API_TOKEN` - API authentication token
  - `DUX_ENVIRONMENT` - production or test
  - `DUX_RETRY_ATTEMPTS` - Number of retry attempts (default: 3)
  - `DUX_TIMEOUT_MS` - Request timeout (default: 30000)
- **Flow**: Payment Approved → Webhook → Create Invoice → Update Order
- **Features**:
  - Automatic retry with exponential backoff (2s, 4s, 8s)
  - Order tracking fields: `dux_invoice_id`, `dux_invoice_number`, `dux_invoice_status`, `dux_invoice_attempts`
  - Error logging and failure tracking
  - Non-blocking (payment succeeds even if invoicing fails)
- **Testing**: Run `npx ts-node src/api/dux-software/test-api.ts` to discover API fields
- **Documentation**: https://duxsoftware.readme.io/reference/crear-factura

### TypeScript Configuration

- **Strict mode enabled** in both frontend and backend
- **Path aliases**: `@/*` maps to `./src/*`
- **Project references**:
  - `tsconfig.app.json` - App source code
  - `tsconfig.node.json` - Build tools (Vite config)
- **Important**: Run `pnpm tsc` before committing to catch type errors

### UI System

- **TailwindCSS 4** for styling
- **shadcn/ui** component library (copy-paste components, not npm packages)
- **Components**: 30+ including Button, Card, Input, Select, Dialog, Carousel, etc.
- **Theme**: Dark/light mode support via next-themes
- **Icons**: Lucide React
- **Toast notifications**: Sonner
- **Responsive**: Mobile-first design

### Environment Variables

**Frontend** (`.env`):
```
VITE_STRAPI_URL=http://localhost:1337
VITE_API_BASE_URL=http://localhost:1337/api
VITE_NODE_ENV=development
```

**Backend** (`.env`):
```
NODE_ENV=development
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=flexigom
DATABASE_USERNAME=flexigom_user
DATABASE_PASSWORD=flexigom_password
JWT_SECRET=<generated>
ADMIN_JWT_SECRET=<generated>
API_TOKEN_SALT=<generated>
APP_KEYS=<generated>
MERCADOPAGO_ACCESS_TOKEN=<your-token>
MERCADOPAGO_WEBHOOK_SECRET=<your-secret>
MERCADOPAGO_SUCCESS_URL=http://localhost:5173/checkout/success
MERCADOPAGO_FAILURE_URL=http://localhost:5173/checkout/failure
MERCADOPAGO_PENDING_URL=http://localhost:5173/checkout/pending
DUX_API_BASE_URL=https://erp.duxsoftware.com.ar/WSERP/rest/services
DUX_API_TOKEN=<your-dux-api-token>
DUX_ENVIRONMENT=production
DUX_RETRY_ATTEMPTS=3
DUX_TIMEOUT_MS=30000
```

## Git Workflow

- **Branch naming**: `feature/<ticket>-short-desc`, `fix/<ticket>-short-desc`
- **Commit format**: Conventional Commits (feat:, fix:, chore:, docs:, style:, refactor:, test:)
- **Main branch**: `main`
- **Development branch**: `dev`
- **Pre-commit**: Always run `pnpm pre-commit` in frontend before committing

## Database

- **PostgreSQL** via Docker Compose
- **Container name**: `flexigom_postgres`
- **Database**: `flexigom`
- **User**: `flexigom_user`
- **Port**: 5432
- **Fallback**: SQLite for development (if Docker not available)
- **Production**: PostgreSQL via Railway with connection pooling

## SEO Implementation

The project has comprehensive SEO infrastructure:

**Infrastructure**:
- React Helmet Async for dynamic meta tags
- Structured data (JSON-LD) for local business, products, breadcrumbs
- SEO utilities in `lib/seo/` (constants, schema generators, utils)
- Components: `SEOHead`, `StructuredData`

**Configuration files**:
- `lib/seo/constants.ts` - Business info, keywords, defaults
- `lib/seo/structured-data.ts` - Schema.org generators
- `lib/seo/utils.ts` - SEO meta generation functions
- `public/robots.txt` - Crawl rules
- `public/sitemap.xml` - Site structure

**Locale**: Spanish Argentina (es-AR), Tucumán geo-targeting

**Strategy**: Local business SEO targeting "colchones Tucumán", "sommiers Tucumán", emphasizing 20+ years experience and personalized service.

## Common Development Tasks

### Adding a new feature

1. Create feature directory: `frontend/src/features/[feature-name]/`
2. Add subdirectories: `hooks/`, `services/`, `pages/`, `components/`, `types/`
3. Create service functions in `services/[resource]-service.ts`
4. Create TanStack Query hooks in `hooks/use-[resource].tsx`
5. Create TypeScript types in `types/[resource]-types.ts`
6. Build pages using existing UI components from `components/ui/`
7. Add error boundary and skeleton components
8. Register routes in `app/router/routes.tsx`

### Adding API endpoints (Strapi)

1. Create content type in Strapi admin panel (http://localhost:1337/admin)
2. Configure permissions in Settings → Users & Permissions → Roles → Public
3. Add TypeScript types in frontend `types/`
4. Create service functions and TanStack Query hooks
5. Test API endpoint: `http://localhost:1337/api/[endpoint]`

### Troubleshooting

- **Both servers must be running**: Check terminals for frontend (port 5173) and backend (port 1337)
- **Database connection errors**: Run `pnpm db:logs` to check PostgreSQL status
- **Environment variables**: Verify `.env` files exist and have correct values
- **Type errors**: Run `pnpm tsc` in frontend directory
- **Build errors**: Check `pnpm build` output for specific errors
- **Payment integration**: Verify MercadoPago credentials in backend `.env`
- **Invoice integration**:
  - Verify Dux API token in backend `.env`
  - Check backend logs for invoice creation attempts
  - Run test script: `cd backend && npx ts-node src/api/dux-software/test-api.ts`
  - Check order records for `dux_invoice_status` and `dux_invoice_error` fields
  - Invoice failures don't block payment flow - check logs for errors
- **CORS errors**: Backend allows `http://localhost:5173` by default
