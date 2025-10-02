# 2048 Game Deployment

This project is a containerized deployment of the **2048 Game** with a **Flask backend** and **NGINX frontend**, running via Docker Compose. It can be accessed locally or hosted publicly, with persistent scoring using SQLite.  

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Run Locally](#setup--run-locally)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Database](#database)
- [Jenkins Pipeline Integration](#jenkins-pipeline-integration)
- [License](#license)

---

## Project Structure

```
2048-game-project/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/              # SQLite DB stored here
├── frontend/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

- **backend/** – Flask backend API for storing and retrieving scores.  
- **frontend/** – NGINX container serving the 2048 game frontend.  
- **docker-compose.yml** – Orchestrates frontend and backend containers.  

---

## Prerequisites

- Docker >= 20.x  
- Docker Compose >= 2.x  
- Python 3.11 (for local backend testing)  

Optional (for CI/CD):

- Jenkins (for automated builds and deployment)  

---

## Setup & Run Locally

1. Clone the repository:

```bash
git clone <repo-url>
cd 2048-game-project
```

2. Build and start containers:

```bash
docker compose up -d --build
```

3. Verify running containers:

```bash
docker ps
```

4. Shutdown containers:

```bash
docker compose down
```

---

## API Endpoints

- **Ping**  
`GET /api/ping` – Returns `{ "message": "pong" }`

- **Best Score**  
`GET /api/best` – Returns the highest score:  
```json
{ "best": 100 }
```

- **Save Score**  
`POST /api/save` – Save a score. Example:

```bash
curl -X POST http://localhost:5001/api/save \
     -H "Content-Type: application/json" \
     -d '{"score": 100}'
```

Response:

```json
{ "status": "ok", "score": 100 }
```

---

## Frontend

Access the game at:

```
http://localhost:8081
```

The frontend communicates with the backend to save and retrieve scores automatically.

---

## Database

- SQLite database is stored at `backend/data/scores.db`.
- Volume mount ensures data persistence even if containers are removed.
- Check scores manually:

```bash
sqlite3 backend/data/scores.db "SELECT * FROM scores;"
```

---

## Jenkins Pipeline Integration

- The pipeline can automatically **build and deploy** the Docker Compose stack on every push.
- Health checks ensure that the backend is fully ready before starting the frontend:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
  interval: 5s
  timeout: 3s
  retries: 5
```

- Jenkins commands for deployment:

```bash
docker compose down
docker compose up -d --build
```

- Errors in the pipeline are reported if the backend is unhealthy.  

---

## License

This project is open source and available under the MIT License.

