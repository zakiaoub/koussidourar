import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average',
  standalone:true
})

export class AveragePipe implements PipeTransform {
  transform(items: any[], key: string): number {
    if (!items || items.length === 0 || !key) return 0;

    const values = items
      .map(item => Number(item[key]))
      .filter(val => !isNaN(val));

    if (values.length === 0) return 0;

    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
}
