export {};

declare global {
  interface Window {
    /** Set true by the Preloader when its intro finishes. */
    __preloaderDone?: boolean;
    /** Set true by BootSignal once React has mounted (watched by bootGuard). */
    __appReady?: boolean;
  }
}
