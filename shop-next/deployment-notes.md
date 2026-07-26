# Deployment Notes

## What is the advantage of per-PR preview deploys?

Preview deploys let each pull request get its own live URL before it reaches production. That makes it easy to test real UI changes, database-backed pages, responsive layouts, and third-party integrations in the same environment that production will use, without blocking the main site.

## What is the risk of storing DB credentials in Vercel env vars?

The risk is that the database password becomes part of the deployment platform's secret surface area. If the Vercel account is compromised, if a preview deployment exposes logs, or if the credential is copied into the wrong project, someone could access the database with the same permissions as the app user.

## How would you rotate a leaked credential without downtime?

Create a new database role or password in the hosted Postgres provider, update the Vercel production environment variables, and redeploy or trigger a fresh production build. Once the app is confirmed working with the new credential, disable or delete the leaked role/password. If the provider supports connection pooling and multiple passwords, keep the old role active briefly during the switch, then remove it after the redeploy succeeds.

## What happens if your hosted DB is down?

The app can still serve static or cached pages if they exist, but any request that needs the database will fail or show an error state. In this project, the products listing catches database errors and renders without products, while product detail and metadata queries may still fail unless additional fallback handling is added.
