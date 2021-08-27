let timeoutId = 0;

export const debounce = (waitTime: number, callback: TimerHandler): void => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(callback, waitTime);
};

export const clearDebounce = (): void => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
};
