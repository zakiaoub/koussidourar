import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true
})
export class SumPipe implements PipeTransform {
  transform(items: any[], property: string): number {
    if (!Array.isArray(items) || !property) {
      return 0;
    }

    return items.reduce((total, item) => {
      const value = item[property];
      return typeof value === 'number' ? total + value : total;
    }, 0);
  }
}
