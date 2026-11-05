# Kindora

Kindora is a community events platform for discovering local initiatives, joining events, and organizing activities that make a positive difference. This repository contains the Next.js web application. Event data and event operations are provided by a separate API service.

## Features

- Browse upcoming community events and view event details.
- Register and sign in with email and password using Better Auth.
- Optionally add a profile image when registering.
- Create, manage, edit, and delete events.
- Join events and view joined events.
- View your account profile and access account actions from the responsive navigation bar.
- Use the JWT issued by Better Auth when making authenticated requests to the event API.
- Toggle the existing light and dark themes.

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- Better Auth with the MongoDB adapter and JWT plugin
- MongoDB for Better Auth data
- A separate event API, configured with `NEXT_PUBLIC_API_URL`

## Prerequisites

- Node.js 20.9 or later
- npm
- A MongoDB deployment
- The event API service running locally or at a reachable URL

## Getting started

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root and set the variables described below. Keep this file local; do not commit credentials or secrets.

3. Start the event API service and make sure its URL and CORS configuration allow requests from the web app.

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose | Example for local development |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign and secure authentication data. Use a long, unique random value. | Generate a private random secret; do not use the example text as a value. |
| `BETTER_AUTH_URL` | Base URL where the Better Auth endpoints are served. | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string used by Better Auth. The application stores Better Auth data in the `kindora-project` database. | `mongodb://127.0.0.1:27017` |
| `NEXT_PUBLIC_API_URL` | Base URL for the separate event API. | `http://localhost:5000` |

`NEXT_PUBLIC_API_URL` is exposed to the browser. Do not put credentials or private keys in it. The API should validate the Bearer JWT for protected operations.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create and validate a production build. |
| `npm run start` | Serve the production build. Run `npm run build` first. |
| `npm run lint` | Run ESLint. |

## Pages and routes

| Route | Description |
| --- | --- |
| `/` | Home page and featured events. |
| `/upcoming-events` | Browse upcoming events. |
| `/events/[id]` | View an event and join it. |
| `/creat-event` | Create an event. This route uses the existing spelling in the project. |
| `/manage-events` | Manage events created by the signed-in user. |
| `/joined-events` | View events the signed-in user has joined. |
| `/profile` | View the signed-in user's profile details. |
| `/login` | Sign in. |
| `/register` | Create an account. |
| `/api/auth/[...all]` | Better Auth API route. |

## Event API integration

The web app expects the separately hosted API to provide the event operations used by these pages. The current client requests include:

| Endpoint | Usage |
| --- | --- |
| `GET /api/events` | List events. |
| `GET /api/events/:id` | Load event details. |
| `POST /api/events` | Create an event. |
| `PATCH /api/events/:id` | Update an event. |
| `DELETE /api/events/:id` | Delete an event. |
| `POST /api/events/:id/join` | Join an event. |
| `GET /api/joined-events` | Load the signed-in user's joined events. |
| `GET /api/my-events` | Load the signed-in user's created events. |

Protected requests send `Authorization: Bearer <JWT>`. Configure the API to allow the web app's origin and to verify tokens issued by this Better Auth installation. The API implementation is not part of this repository.

## Project layout

```text
src/
├── app/
│   ├── (auth)/          # Login and registration
│   ├── api/auth/        # Better Auth route handler
│   ├── events/[id]/     # Event details
│   ├── joined-events/   # Joined events
│   ├── manage-events/   # Created-event management
│   ├── profile/         # Account profile
│   ├── upcoming-events/ # Event discovery
│   └── creat-event/     # Event creation
├── components/
│   ├── auth/            # Auth session provider
│   ├── home/            # Home-page sections
│   ├── layout/          # Navbar and footer
│   └── ui/              # Shared UI components
├── lib/                 # Better Auth configuration and client
└── proxy.ts             # Route protection
```

## Production notes

- Set `BETTER_AUTH_URL` to the deployed web app's canonical HTTPS origin.
- Set a strong, unique `BETTER_AUTH_SECRET` and a production MongoDB connection string in the hosting provider's secret environment configuration.
- Set `NEXT_PUBLIC_API_URL` to the deployed event API's public base URL and configure that API's CORS allowlist and JWT verification accordingly.
- Never commit `.env.local` or expose server credentials in `NEXT_PUBLIC_*` variables.
