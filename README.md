
  # Smart Tourist Safety System

  A React + Vite dashboard for managing tourist safety (alerts, verification, analytics) with an optional Express API scaffold.

  ## Tech Stack

  - React 18, Vite
  - shadcn/radix UI primitives, lucide-react icons
  - recharts (charts)
  - Express (optional backend scaffold)

  ## Project Structure

  ```
  src/
    App.tsx              # Main UI (tabs: Dashboard, Alerts, Verification, Analytics)
    components/          # Feature UIs + ui primitives
    midleware/           # Express middlewares (auth, logger, rate limiter, validation, errors)
    routes/              # Express routes (auth, alerts, tourists, analytics, health, index)
    styles/              # Global styles
    main.tsx, index.css  # Vite entry
  ```

  ## Run the UI

  1) Install deps: `npm i`
  2) Start dev server: `npm run dev`
  3) Open the printed URL (typically `http://localhost:5173`)

  Notes:
  - UI uses mocked data and simple in-memory auth.
  - No API calls are wired by default.

  ## Optional: Run the API

  The repo includes middlewares and route modules but no server entry by default. To run an API locally:

  1) Ensure deps: `express`, `express-rate-limit`, `@types/express`, `@types/express-rate-limit` (installed already).
  2) Create `server.ts` in the project root:

  ```ts
  import express from 'express';
  import cors from 'cors';
  import { registerRoutes } from './src/routes';
  import { errorHandler, notFoundHandler } from './src/midleware/errorHandler';

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  registerRoutes(app);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => console.log(`API http://localhost:${port}`));
  ```

  3) Add a script to `package.json`:

  ```json
  { "scripts": { "api": "ts-node server.ts" } }
  ```

  4) Start: `npm run api`

  ### API Endpoints (summary)

  - `GET /health/live`, `GET /health/ready`
  - `POST /api/auth/login`, `POST /api/auth/logout`
  - `GET /api/alerts`, `POST /api/alerts`
  - `POST /api/tourists/verify`, `GET /api/tourists`
  - `GET /api/analytics/summary`

  Middlewares: request logging, rate limiting, simple bearer auth (`src/midleware/auth.ts`), validation, centralized error handling.

  Replace the placeholder auth with real JWT verification before production.

## Installing required dependencies:

  Run `npm i` to install the dependencies.

  
  ## Scripts to start development server:

  - `npm run dev` – Vite dev server
  - `npm run build` – production build
  - `npm run api` – start Express API (after adding `server.ts`)
