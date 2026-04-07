import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times'
})

export class TimesPipe implements PipeTransform {
  transform(value: { id: string; name: string }[]): { id: string; name: string }[] {
    return value.sort((a, b) => {
      const [hA, mA] = a.id.split(':').map(Number);
      const [hB, mB] = b.id.split(':').map(Number);
      return hA * 60 + mA - (hB * 60 + mB);
    });
  }
}
