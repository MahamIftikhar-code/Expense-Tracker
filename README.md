# Expense Tracker App

A full stack expense tracking application built with React, Node.js, MongoDB, Docker, Jenkins CI/CD, and Terraform on AWS.

## Deployment

Application is deployed on AWS EC2 using Terraform for infrastructure provisioning and Jenkins for automated CI/CD pipeline.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Nginx |
| Backend | Node.js + Express |
| Database | MongoDB |
| Container | Docker |
| CI/CD | Jenkins |
| Infrastructure | Terraform + AWS EC2 |

## Features

- Add, view, and delete expenses
- Category-wise breakdown (Food, Transport, Shopping, Bills, Health)
- Total spending summary
- Fully containerized with Docker
- Automated CI/CD pipeline with Jenkins
- Infrastructure as Code with Terraform

## Project Structure
```
expense-tracker/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── Summary.jsx
│   │   └── main.jsx
│   ├── nginx.conf
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   └── models/
│   └── Dockerfile
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── docker-compose.yml
└── Jenkinsfile
```
## CI/CD Pipeline

1. Code pushed to GitHub
2. Jenkins pulls latest code
3. Backend tests run
4. Terraform provisions AWS EC2 instance
5. Docker images built and pushed to DockerHub
6. Application deployed to EC2

### Prerequisites
- Docker and Docker Compose
- Jenkins with agent configured
- AWS account with credentials
- Terraform installed on Jenkins agent

