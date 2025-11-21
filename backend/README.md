# Backend API Setup Instructions
- [Prerequisites](#prerequisites)
- [Setup environment variables](#setup-environment-variables)
- [Run the project](#run-the-project)

## Prerequisites
- Install [Docker](https://www.docker.com/get-started/)
- Install [Java 21](https://www.oracle.com/java/technologies/downloads)
- Install [Gradle](https://gradle.org/)


## Setup environment variables
Set the following environment variables in your IDE's run configuration:
```
DOCKER_COMPOSE_ENABLED=true;
SPRING_DATASOURCE_USERNAME=fridget;
SPRING_DATASOURCE_PASSWORD=secret;
```

## Run the project
Open the project in VSCode or IntelliJ IDEA in the `/backend` directory.

This will also compose containers for the database as well as the LLM runtime.