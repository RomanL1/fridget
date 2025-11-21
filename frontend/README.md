# Tauri App Setup Instructions

- [Prerequisites](#prerequisites)
- [Run the project](#run-the-project)
- [Desktop & Web](#desktop--web)
- [Android](#android)
  - [Emulator](#emulator)
  - [Physical device](#physical-device)

## Prerequisites

Follow these steps before running the project

- Follow [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/) (Installs Rust, Node.js and Android Studio) for your respective OS
- Ensure the terminal is scoped to the `/frontend` directory
- Install dependencies
  ```bash
  npm ci
  ```

## Run the Project

> Ensure the terminal runs in administrator-mode, so that writing symlinks is permitted

### Desktop & Web

Running the following command will serve up a Tauri application in Desktop mode.You can also view the application in a browser under [localhost:1420](http://localhost:1420)

```bash
npm run tauri dev
```

### Android

#### Emulator

Running the following command will serve up a Tauri application inside an Android emulator.

```bash
npm run tauri android dev
```

> On windows, open the terminal as an Administrator

#### Physical device

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

Open `chrome://inspect/#devices` in your chrome-based browser to debug open Chrome Developer Tools.

> For physical devices, this only works as long as the device is connected via USB
