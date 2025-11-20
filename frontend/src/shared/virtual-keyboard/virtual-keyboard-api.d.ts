/* 
  The VirtualKeyboard API is still 
  experimental and are subject to change in the future.
  https://w3c.github.io/virtual-keyboard/#dom-elementcontenteditable-virtualkeyboardpolicy
*/
declare global {
  interface Navigator {
    virtualKeyboard?: VirtualKeyboard;
  }
}

interface VirtualKeyboard extends EventTarget {
  readonly boundingRect: DOMRect;
  overlaysContent: boolean;
  show(): undefined;
  hide(): undefined;
  ongeometrychange: ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
}

export {};
