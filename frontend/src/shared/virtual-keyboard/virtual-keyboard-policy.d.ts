/* 
  The virtualkeyboardpolicy attribute is still 
  experimental and are subject to change in the future.
  https://w3c.github.io/virtual-keyboard/#dom-elementcontenteditable-virtualkeyboardpolicy
*/
namespace React {
  declare interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    virtualkeyboardpolicy?: 'auto' | 'manual' | undefined;
  }
}
