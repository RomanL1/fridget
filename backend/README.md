# Setup
To Run this project some requirements have to be met.

## Install Brew on your Mac
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

## Install Docker on your machine
MacOS:
brew install docker

Windows:
https://docs.docker.com/docker-for-windows/install/

## Install Java 21
Install Java 21 on your machine, if you don't have it already.

MacOS:
brew install --cask temurin@21

Windows:
https://adoptium.net/temurin/releases/?version=21

## Install Gradle
Install Gradle on your machine, if you don't have it already.

MacOS:
brew install gradle

Windows:
https://gradle.org/install/
https://gradle.org/releases/

## open the project in your IDE
open the project in vscode or intellij idea with folder "backend"

## environment variables while running the application
set the following environment variables in your IDE run configuration
DOCKER_COMPOSE_ENABLED=true;SPRING_DATASOURCE_USERNAME=fridget;SPRING_DATASOURCE_PASSWORD=secret;

## building docker image
docker buildx create --name multi-fridget-backend --use

docker buildx inspect --bootstrap

docker buildx build . \
  --platform linux/amd64,linux/arm64 \
  -t romanl1/fridget:latest \
  --push