## Table of contents

* [Project description](#project-description)
* [Architecture overview](#architecture-overview)
* [Quickstart — development](#quickstart--development)
* [Useful scripts (examples)](#useful-scripts-examples)
* [Folder structure (recommended)](#folder-structure-recommended)
* [Environment variables (examples)](#environment-variables-examples)
* [API & Types](#api--types)
* [UI conventions & design system](#ui-conventions--design-system)
* [Data fetching patterns (TanStack Query)](#data-fetching-patterns-tanstack-query)
* [CI / CD (high level)](#ci--cd-high-level)
* [Testing](#testing)
* [Deployment tips](#deployment-tips)
* [Conventions & Best practices (short)](#conventions--best-practices-short)
* [Troubleshooting / FAQ](#troubleshooting--faq)
* [Contact & next steps](#contact--next-steps)

---

## Project description

**Flexigom** is an MVP focused on fast product/content iteration and a reliable checkout flow for tyre/wheel services.
Key goals:

* Content managed via **Strapi** for fast non-dev updates.
* Clear separation content ⇄ presentation (Strapi ↔ Frontend).
* Strong developer DX: TypeScript types, TanStack Query hooks, reusable UI primitives.
* Production readiness: CI, staging/prod, payment & invoicing integrations.

---

## Architecture overview

* **Backend (Strapi)**

  * Headless CMS for: `Products`, `Categories`, `Orders`, `Promotions`, `Users`.
  * Exposes REST roles & permissions for admin/public.
  * DB: **PostgreSQL** (prod).
* **Frontend (React + TypeScript)**

  * Pages: Home, Listing, Product Detail, Cart, Checkout, Account.
  * UI: **TailwindCSS** + **shadcn** primitives.
  * Data fetching: **TanStack Query**.
* **Integrations**

  * Payments: Mercado Pago / Stripe (webhooks).
  * Billing: Dux (or similar) API from backend.
* **Infra / Deploy**

  * Frontend: Railway
  * Backend & DB: Railway
* **Local dev**

  * Two main workspaces: `frontend/` and `backend/`.

---

## Quickstart — development

Abre **dos terminales** (uno para frontend, otro para backend):

```bash
# Frontend
cd frontend
pnpm dev

# Backend (Strapi)
cd backend
pnpm dev
```

---

## Useful scripts (examples)

**frontend/package.json (examples)**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  }
}
```

**backend/package.json (Strapi examples)**

```json
{
  "scripts": {
    "dev": "strapi develop",
    "build": "strapi build",
    "start": "strapi start"
  }
}
```

* Consumir endpoints Strapi REST:

  * `GET /products`
  * `GET /products/:id`
  * `POST /orders`
* Generar o mantener interfaces TypeScript en `frontend/src/services/types.ts`.

---

## UI conventions & design system

* **shadcn** primitives + Tailwind utility tokens.
* `ui/` contiene componentes atómicos (Button, Card, Input).
* `components/` contiene piezas compuestas (ProductCard, Gallery).
* Tokens en `tailwind.config.js`.
* Accesibilidad: `alt` en imágenes, roles, focus states.

---

## Data fetching patterns (TanStack Query)

* Queries para recursos de solo lectura (productos, categorías).
* Mutations para acciones (carrito, crear orden).
* `staleTime` / `cacheTime` según tipo:
  * Listados: `staleTime: 30_000`
  * PDP: `staleTime: 60_000`
* Invalidar queries tras mutaciones
---

## Deployment tips

* Strapi + Postgres: usar managed Postgres; set `NODE_ENV=production`.
* Generar `strapi build` en deploy para la admin panel.
* Configurar webhook signature validation para pagos.
* CDN para assets.

---

## Conventions & Best practices

* Branches: `feature/<ticket>-short-desc`, `fix/<ticket>...`
* Commits: Conventional Commits (feat/, fix/, chore/).
* PRs: link a ticket Jira, descripción corta, reviewer.
* TypeScript strict mode en `tsconfig.json`.
* Accessibility & responsive-first design.
