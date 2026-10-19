# Palak Srivastava — Portfolio

A responsive, dark-first personal portfolio for Palak Srivastava, an aspiring AI and data analyst. It includes an animated React experience, static project and profile content, an Express/Mongoose contact API, and PDF/DOCX CV download endpoints.

**Live portfolio:** `TODO_PORTFOLIO_LIVE_URL`  
**API deployment:** `TODO_API_LIVE_URL`

## Stack

- Client: React, Vite, React Router, Framer Motion, React Icons
- Server: Node.js, Express, Mongoose, MongoDB, Helmet, CORS, express-rate-limit
- Optional email notifications: Nodemailer

## Local setup

1. Install Node.js 18 or newer and MongoDB (local or hosted).
2. Copy the root `.env.example` to `server/.env` and fill in the server values below. The API loads its environment from `server/.env`.
3. Install and run the API:

   ```sh
   cd server
   npm install
   npm run dev
   ```

4. In a second terminal, install and run the client:

   ```sh
   cd client
   npm install
   npm run dev
   ```

5. Open the Vite URL (normally `http://localhost:5173`). The API listens on port `5000` by default.

The API can start without a MongoDB URI, but contact submissions then return `503` until MongoDB is configured and connected. If email credentials are not set, contact messages are saved without sending an email notification.
During local development, Vite proxies `/api` requests to `http://localhost:5000`, so the contact form works even if Vite selects a different available client port. In production, set `VITE_API_URL` to the deployed API origin.

## Environment variables

Set the server variables in `server/.env` for local development and in the server deployment environment for production. Set `VITE_API_URL` in the client build environment when deploying:

| Variable | Purpose |
| --- | --- |
| `PORT` | API listening port; defaults to `5000` |
| `MONGO_URI` | MongoDB connection URI |
| `CLIENT_URL` | Exact deployed client origin allowed by CORS |
| `EMAIL_USER` | Optional SMTP account and notification recipient |
| `EMAIL_PASS` | Optional email account password or app password |
| `EMAIL_SERVICE` | Optional Nodemailer service; defaults to `gmail` |
| `VITE_API_URL` | Client API base URL for deployments; blank uses the same-origin Vite proxy locally |

Do not commit `.env` files or production credentials.

## CV and profile assets

- Replace `client/public/profile.jpg` with a profile photo.
- Replace the CV files in `server/files/` with current copies when needed.
- Update social, project, and deployment links in `client/src/data.js` and this README wherever a `TODO_*` value appears.

## Deployment

### Client (Vercel or Netlify)

1. Set the project root/build base to `client`.
2. Build with `npm run build`; publish the `dist` directory.
3. Set `VITE_API_URL` to the deployed API origin.
4. Vercel SPA routing is configured by `client/vercel.json`. For Netlify, configure its SPA fallback to serve `index.html` for app routes.

### Server (Render or Railway)

1. Deploy the `server` directory as a Node service with `npm start`.
2. Set `PORT` (if required by the provider), `MONGO_URI`, and `CLIENT_URL` to the deployed client origin.
3. Optionally set `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_SERVICE` for message notifications.
4. Keep `server/files/Palak_Srivastava_CV.pdf` and `server/files/Palak_Srivastava_CV.docx` included with the service.

## API

- `GET /api/health` — basic API health check
- `GET /api/cv/pdf` — download the PDF CV
- `GET /api/cv/docx` — download the DOCX CV
- `POST /api/contact` — validate and save `{ "name", "email", "message" }` to MongoDB
