
  # Smart Tourist Safety System

  A React + Vite dashboard for managing tourist safety (alerts, verification, analytics) with an Express API.

  Original design: `https://www.figma.com/design/D2zqdALVGNoREi8n2y8t7s/Smart-Tourist-Safety-System`

  ## Tech Stack

  - React 18, Vite
  - shadcn/radix UI primitives, lucide-react icons
  - recharts (charts)
  - Express (optional backend scaffold)

  ## Project Structure

  ```
  src/
    App.tsx              # Main UI (routes: /, /alerts, /verification, /analytics, /tourists/:id)
    components/          # Feature UIs + ui primitives
    midleware/           # Express middlewares (auth, logger, rate limiter, validation, errors)
    routes/              # Express routes (auth, alerts, tourists, analytics, echo, index)
    styles/              # Global styles
    main.tsx, index.css  # Vite entry
    server.ts            # Express server entry
  ```

  ## Prerequisites

  - Node.js 18+ (Node 20+ recommended)
  - npm 9+

  ## Install Dependencies

  ```bash
  npm i
  ```

  ## Run the UI (Vite)

  1) Start the dev server:
     ```bash
     npm run dev
     ```
  2) Open the printed URL (typically `http://localhost:5173`)

  Notes:
  - UI uses React Router: `/`, `/alerts`, `/verification`, `/analytics`, `/tourists/:id`.
  - API requests go to `/api/*` and are proxied to the Express server on port 3000.

  ## Run the API (Express)

  Scripts are already set up:

  - Start once:
    ```bash
    npm run server
    ```
  - Watch mode (auto-restart on changes):
    ```bash
    npm run server:watch
    ```

  The API listens at `http://localhost:3000`.

  ### API Endpoints (summary)

  - `GET /api/echo` and `GET /api/echo/:id` (no auth; echoes query/params/body)
  - `POST /api/auth/login`, `POST /api/auth/logout`
  - `GET /api/alerts`, `POST /api/alerts`
  - `POST /api/tourists/verify`, `GET /api/tourists`, `GET /api/tourists/:id`
  - `GET /api/analytics/summary`

  Middlewares: request logging, rate limiting, simple bearer auth (`src/midleware/auth.ts`), validation, centralized error handling.

  Replace the placeholder auth with real JWT verification before production.

  ## Typical Local Workflow

  1) Start the API (port 3000):
     ```bash
     npm run server:watch
     ```
  2) Start the UI (port 5173):
     ```bash
     npm run dev
     ```
  3) Log in from the UI. The app stores the returned token and sends it as `Authorization: Bearer <token>` for protected routes.

  ## Quick Tests

  - Login (returns a demo token):
    ```bash
    curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username":"demo","password":"demo"}'
    ```

  - List alerts (requires token):
    ```bash
    curl -s http://localhost:3000/api/alerts -H "Authorization: Bearer demo-token"
    ```

  - Echo with query/params (no auth):
    ```bash
    curl -s "http://localhost:3000/api/echo/123?name=alex&role=officer"
    ```

## Installing required dependencies:

  Run `npm i` to install the dependencies.

  
  ## Scripts to start development server:

  - `npm run dev` – Vite dev server
  - `npm run build` – production build
  - `npm run server` – start Express API
  - `npm run server:watch` – start Express API in watch mode
