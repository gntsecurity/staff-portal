# GNT Staff Portal (Cloudflare Access + NinjaOne Live Data)

## Local run

copy .env.example .env
npm install
npm run dev

Open http://localhost:3000

## Notes

Production auth uses Cloudflare Access headers:
Cf-Access-Authenticated-User-Email
Cf-Access-Authenticated-User-Name

Do not set DEV\_USER\_EMAIL in production.

GoLive!

