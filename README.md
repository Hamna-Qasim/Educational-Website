# Educational Website – DevOps Project

## Project Overview

This project demonstrates the development and deployment of an Educational Website using DevOps practices. It covers version control, collaborative development, containerization, Docker Compose, and CI/CD automation.

## Technologies Used

- Git and GitHub
- Docker
- Docker Compose
- Docker Hub
- Jenkins
- GitHub Actions (Project Deliverable 4)

## Project Structure

```text
Educational-Website/
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
└── README.md
```

## Running the Application

### Using Docker Compose

1. Clone the repository:

```bash
git clone https://github.com/Hamna-Qasim/Educational-Website.git
```

2. Navigate to the project directory:

```bash
cd Educational-Website
```

3. Build and start the frontend and backend services:

```bash
docker compose up --build
```

4. Access the frontend through your browser:

```text
http://localhost
```

5. Stop the application:

```bash
docker compose down
```

## Docker Hub

Docker images are maintained in the following Docker Hub repository:

[hamna1243/dev_ops](https://hub.docker.com/r/hamna1243/dev_ops)

## CI/CD Pipeline

The project is being extended to implement an automated CI/CD pipeline using GitHub Actions.

The planned workflow includes:

- **Build:** Build Docker images for the frontend and backend.
- **Test:** Perform basic application or container tests.
- **Push:** Push updated Docker images to Docker Hub.
- **Deploy:** Automate deployment to a cloud environment.

The workflow will be triggered by code pushes to the main branch and merged pull requests.

## Project Changelog

### Project Deliverable 1 – GitHub Repository Setup

- Created a GitHub repository.
- Added project contributors.
- Pushed application source code to GitHub.
- Created and managed branches.
- Cloned the repository locally.
- Committed and pushed changes.
- Created and merged Pull Requests.

### Project Deliverable 2 – Docker Containerization

- Created a Dockerfile for the application.
- Built the Docker image.
- Ran the Docker container locally.
- Pushed the Dockerfile to GitHub.
- Published the Docker image to Docker Hub.

### Activity – Docker Compose

- Created a separate backend folder.
- Added a Dockerfile for the backend.
- Created a `docker-compose.yml` configuration.
- Configured frontend and backend services.
- Built and ran the application using Docker Compose.
- Pushed the Dockerfile and Docker Compose configuration to GitHub.

### Activity – Jenkins Webhook Testing

- Configured Jenkins for automated build triggering.
- Tested GitHub webhook integration with Jenkins.

### Project Deliverable 4 – GitHub Actions CI/CD Automation

- GitHub Actions workflow configuration.
- Automated Docker image building.
- Automated testing.
- Docker Hub image publishing.
- Cloud deployment automation.

*This section will be updated as the deliverable is completed.*
