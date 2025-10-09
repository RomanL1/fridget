# fridget

Please use prefixes from this guide here for commit messages:
https://github.com/RefactoringCombos/ArlosCommitNotation


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
- Connect the device to your computer via USB
- Enable Developer mode on the device
- Enable USB Debugging inside the Developer settings

Afterwards run the following command to serve up the Tauri application on your Android device.
```shell
npm run tauri android dev
```
> On windows, open the terminal as an Administrator

