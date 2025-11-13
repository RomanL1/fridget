export {};

// https://w3c.github.io/virtual-keyboard/#the-virtualkeyboard-interface
declare global {
  interface Navigator {
    readonly virtualKeyboard: VirtualKeyboard;
  }
}

interface VirtualKeyboard extends EventTarget {
  show(): void;
  hide(): void;
  readonly boundingRect: DOMRect;
  overlaysContent: boolean;
}
