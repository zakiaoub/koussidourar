import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent',
  standalone:true
})
export class PercentPipe implements PipeTransform {
  transform(value: number, total: number = 100): number {
    return (value / total) * 100;
  }
}
