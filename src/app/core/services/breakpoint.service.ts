import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  get current(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  }
}
