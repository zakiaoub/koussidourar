import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map(data: { key: string, value: number }[], mode: 'min' | 'max'): number {
    if (!data || data.length === 0) return 0;
    const values = data.map(item => item.value);
    return mode === 'min' ? Math.min(...values) : Math.max(...values);
  }
}
