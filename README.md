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

</div>

## Table of Contents

- [About the project](https://github.com/RomanL1/fridget?tab=readme-ov-file#about-the-project)
- [Installation](https://github.com/RomanL1/fridget?tab=readme-ov-file#installation)
- [Run the project](https://github.com/RomanL1/fridget?tab=readme-ov-file#run-the-project)
  - [Desktop & Web](https://github.com/RomanL1/fridget?tab=readme-ov-file#desktop--web)
  - [Android](https://github.com/RomanL1/fridget?tab=readme-ov-file#android)
    - [Run inside an emulator](https://github.com/RomanL1/fridget?tab=readme-ov-file#run-inside-an-emulator)
    - [Run on a physical device](https://github.com/RomanL1/fridget?tab=readme-ov-file#run-on-a-physical-device)
    - [Debugging](https://github.com/RomanL1/fridget?tab=readme-ov-file#debugging)
- [Contributing](https://github.com/RomanL1/fridget?tab=readme-ov-file#contributing)
- [License](https://github.com/RomanL1/fridget?tab=readme-ov-file#license)

## About the project

tbd

## Installation

Follow these steps before running the project

- Follow [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/) (Installs Rust, Node.js and Android Studio)
- Install dependencies
  ```bash
  npm clean-install
  ```

## Run the Project

### Desktop & Web

Running the following command will serve up a Tauri application in Desktop mode.

You can also view the application in a browser under [localhost:1420](http://localhost:1420)

```bash
npm run tauri dev
```

### Android

#### Run inside an Emulator

Running the following command will serve up a Tauri application inside an Android emulator.

```bash
npm run tauri android dev
```

> On windows, open the terminal as an Administrator

#### Run on a Physical Device

- Make sure the device runs on the same network as your computer
- Connect the device to your computer via USB
- Enable Developer mode on the device
- Enable USB Debugging inside the Developer settings

Afterwards run the following command to serve up the Tauri application on your Android device.

```shell
npm run tauri android dev
```

> On windows, open the terminal as an Administrator

#### Debugging

Open [chrome://inspect/#devices](chrome://inspect/#devices) in your chrome-based browser to debug open Chrome Developer Tools.

> For physical devices, this only works as long as the device is connected via USB

## Contributing

Use [Conventional Commits](https://www.conventionalcommits.org/) when contributing to this repository.

## License

This project is [MIT](https://github.com/RomanL1/fridget/blob/main/LICENSE) licensed.<br>
You are free to use, modify, and distribute this software, provided that the original copyright and license notice are included.
