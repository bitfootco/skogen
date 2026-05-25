export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface AddToastOptions {
  duration?: number;
}

type Listener = (items: ToastItem[]) => void;

let items: ToastItem[] = [];
const listeners: Listener[] = [];

function notify(): void {
  const snapshot = [...items];
  for (const listener of listeners) listener(snapshot);
}

export function subscribe(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export function addToast(type: ToastType, message: string, options?: AddToastOptions): string {
  const id = crypto.randomUUID();
  items = [...items, { id, message, type, duration: options?.duration }];
  notify();
  return id;
}

export function removeToast(id: string): void {
  items = items.filter((item) => item.id !== id);
  notify();
}

export function getToasts(): ToastItem[] {
  return items;
}

export const toast = {
  success: (message: string, options?: AddToastOptions) => addToast('success', message, options),
  error: (message: string, options?: AddToastOptions) => addToast('error', message, options),
  info: (message: string, options?: AddToastOptions) => addToast('info', message, options),
  warning: (message: string, options?: AddToastOptions) => addToast('warning', message, options),
};
