type ToastOptions = {
  delay?: number;
};

type ToastType = 'error' | 'success' | 'info';

const DEFAULT_DELAY_MS = 4000;

class ToastHelper {
  private timer: NodeJS.Timeout | null = null;

  show(type: ToastType, message: string, options?: ToastOptions) {
    const toastPortal = document.querySelector<HTMLDivElement>('#toast-portal');
    if (toastPortal === null) {
      return;
    }

    toastPortal.innerText = message;
    toastPortal.classList.remove('hide');
    toastPortal.classList.add(type);

    const delay = options?.delay ?? DEFAULT_DELAY_MS;

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      toastPortal.classList.add('hide');
    }, delay);
  }

  error(message: string, options?: ToastOptions) {
    this.show('error', message, options);
  }

  success(message: string, options?: ToastOptions) {
    this.show('success', message, options);
  }

  info(message: string, options?: ToastOptions) {
    this.show('info', message, options);
  }
}

export default new ToastHelper();
