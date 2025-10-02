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

Running the following command will serve up a Tauri application inside an Android emulator.
On windows, it is recommended to open a terminal in Administrator-mode.

```bash
npm run tauri android dev
```

> This command will take a few minutes when performed for the first time
