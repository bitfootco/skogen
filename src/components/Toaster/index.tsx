import { useEffect, useState } from 'react';
import { subscribe, removeToast } from '../../utils/toastStore';
import type { ToastItem } from '../../utils/toastStore';
import Toast from '../Toast';

type ToasterPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';

interface ToasterProps {
  position?: ToasterPosition;
  duration?: number;
}

const positionDictionary: Record<ToasterPosition, string> = {
  'bottom-right':  'bottom-4 right-4 items-end',
  'bottom-left':   'bottom-4 left-4 items-start',
  'top-right':     'top-4 right-4 items-end',
  'top-left':      'top-4 left-4 items-start',
  'top-center':    'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const Toaster = ({ position = 'bottom-right', duration = 4000 }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // 1. subscribe to the store on mount; unsubscribe on unmount
  useEffect(() => {
    return subscribe(setToasts);
  }, []);

  // 2. auto-dismiss each toast after its duration elapses
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => removeToast(t.id), t.duration ?? duration),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, duration]);

  if (toasts.length === 0) return null;

  return (
    <div className={`fixed z-50 flex flex-col gap-2 ${positionDictionary[position]}`}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default Toaster;
