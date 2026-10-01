# Backend (login/signup) - local setup

    browser -> web (nginx :80) -> api (Express :3000) -> db (Postgres :5432)

Folders:

    frontend/   website files + nginx.conf + Dockerfile  -> "web" container
    backend/    Express API (server.js) + Dockerfile     -> "api" container
    docker-compose.yml, .env                             -> wire everything together

Only `web` is exposed to your computer. `api` and `db` are reachable only inside Docker's network.

## Run

1. Install and start Docker Desktop.
2. Check `.env`. It already has generated values. If it's missing, copy `.env.example` to `.env`.
3. In the `education` folder (where docker-compose.yml is):

       docker compose up --build

4. Open http://localhost/logsign.html, sign up, then log in.

Stop with `Ctrl+C` or `docker compose down`. Users are kept in the `pgdata` volume.
`docker compose down -v` also deletes the database.

If port 80 is busy, set `WEB_PORT=8080` in `.env` and open http://localhost:8080.

## API

| Method | Path          | Body                          | Responses                      |
|--------|---------------|-------------------------------|--------------------------------|
| GET    | /api/health   | -                             | 200 ok, 503 db unreachable     |
| POST   | /api/signup   | `{email, username, password}` | 201, 400, 409 already taken    |
| POST   | /api/login    | `{username, password}`        | 200 + JWT token, 400, 401      |

Test from PowerShell:

    Invoke-RestMethod http://localhost/api/health
    Invoke-RestMethod -Method Post -Uri http://localhost/api/login -ContentType 'application/json' -Body '{"username":"ali","password":"secret123"}'

## Useful commands to practice

    docker compose ps                     # status + health of each container
    docker compose logs -f api            # follow the API logs
    docker compose exec db psql -U education -d education -c "select id, username, created_at from users;"
    docker compose up --build api         # rebuild only the API after changing server.js
