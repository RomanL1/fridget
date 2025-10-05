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


## create file application.properties
create the file "application.properties" under "backend/src/main/resources/"

I sent you the openai-key.

minimal content (look here for future updates):
spring.application.name=fridget
spring.ai.openai.api-key=<insert-openai-key-here>

