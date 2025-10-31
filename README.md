[![CI Build](https://github.com/RomanL1/fridget/actions/workflows/ci-tauri.yml/badge.svg)](https://github.com/RomanL1/fridget/actions/workflows/ci-tauri.yml) 
[![Backend CI Build](https://github.com/RomanL1/fridget/actions/workflows/backend.yml/badge.svg)](https://github.com/RomanL1/fridget/actions/workflows/backend.yml)

# fridget
- [Project Backlog](https://github.com/users/RomanL1/projects/2/views/1)
- [Design Mockups](https://www.figma.com/design/PTd7Ux0Pg6AlYBZMUGL41i/Fridget-UI?node-id=3437-870&p=f&t=SlxmbiDBc71RR49D-0)

## Prerequisites

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
