import { Button, TextField } from '@radix-ui/themes';
import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { BarcodeScannerToggle } from './BarcodeScanner/BarcodeScannerToggle';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <TextField.Root
          id="greet-input"
          placeholder="Enter a name..."
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <Button type="submit">Greet</Button>
      </form>

      <br />

      <div className="row">
        <BarcodeScannerToggle />
      </div>

      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
