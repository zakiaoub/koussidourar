export interface Toast {
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
    summary: string;
    detail: string;
    life?: number;
    sticky?: boolean;
  }
  