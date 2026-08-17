export {};

declare global {
  interface Window {
    /** Set true by the Preloader when its intro finishes. */
    __preloaderDone?: boolean;
  }
}
