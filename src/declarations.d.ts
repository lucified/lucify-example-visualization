// These are needed to tell TypeScript what the imports for
// these file types return.

declare module '*.scss' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const content: string;
  export = content;
}

declare module '*.png' {
  const content: string;
  export = content;
}
