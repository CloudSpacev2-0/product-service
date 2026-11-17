# product-service
Node.js/Express Product API for the "Beyond Localhost" Azure demo. In-memory data.

- `GET /health`, `GET /api/products`, `GET /api/products/:id`
- Run: `npm install && npm start` (port 3001), test: `npm test`
- CI: every push to `main` builds a `linux/amd64` image and pushes `<dockerhub-user>/product-service:latest` and `:<short-sha>`.
  Needs repo secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
- Deployed to Azure Container Apps by the `infra` repo.
