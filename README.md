<div align="center">
  <a href="https://github.com/RomanL1/fridget">
    <picture>
      <source srcset="https://github.com/RomanL1/fridget/blob/main/frontend/public/app_icon_light_transparent.svg" media="(prefers-color-scheme: light)" />
      <source srcset="https://github.com/RomanL1/fridget/blob/main/frontend/public/app_icon_dark_transparent.svg" media="(prefers-color-scheme: dark)" />
      <img src="https://github.com/RomanL1/fridget/blob/main/frontend/public/app_icon_light_transparent.svg" width="80" height="80"/>
    </picture>
  </a>

<h3 align="center">Fridget</h3>

  <p align="center">
    Organize the contents of your fridge, create shopping lists <br>
    and browse through recipes based on what you have at home
    <br />
    <a href="https://github.com/users/RomanL1/projects/2/views/1" target="_blank">Project Backlog</a>
    &middot;
    <a href="https://www.figma.com/design/PTd7Ux0Pg6AlYBZMUGL41i/Fridget-UI" target="_blank">Design Mockups</a>
    <br/>
  </p>

[![CI Build](https://github.com/RomanL1/fridget/actions/workflows/ci-tauri.yml/badge.svg)](https://github.com/RomanL1/fridget/actions/workflows/ci-tauri.yml)
[![Backend CI Build](https://github.com/RomanL1/fridget/actions/workflows/backend.yml/badge.svg)](https://github.com/RomanL1/fridget/actions/workflows/backend.yml)
[![Chefkoch API CI Build](https://github.com/RomanL1/fridget/actions/workflows/chefkoch-api.yaml/badge.svg)](https://github.com/RomanL1/fridget/actions/workflows/chefkoch-api.yaml)

</div>

## Table of Contents

- [About the project](#about-the-project)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## About the project

Fridget is an android application built to organize the contents of your fridge, create and manage shopping lists and get recipe inspirations for your next meal, based on the contents of your fridge.

Core Functionalities of Fridget are:

- Scanning Items by their barcode
- Manually entering Items without a specific barcode
- Keeping track of expiry dates
- Getting trending recipe recommendations
- Filtering recipes by ingredients in your fridge
- Creating and managing shopping list

The app was built with Tauri to enable cross-platform application development for Web, Desktop, iOS and Android.

<img src="https://github.com/user-attachments/assets/e7709d16-a4b1-4442-b12d-e7ac42eca286" height="300px">

## Installation

See installation and setup instructions for the following components:

- [Tauri App](./frontend/README.md)
- [Backend API](./backend/README.md)

> Running the backend API will compose docker containers locally for the database, recipe API and LLM runtime.

## Contributing

Use [Conventional Commits](https://www.conventionalcommits.org/) when contributing to this repository.

## License

This project is [MIT](https://github.com/RomanL1/fridget/blob/main/LICENSE) licensed.<br>
You are free to use, modify, and distribute this software, provided that the original copyright and license notice are included.
