import { Pipe, PipeTransform } from '@angular/core';

export function GetNotation(category: number): string {
  const data = ["exceptional", "very_good", "good", "pleasant"];

  if (category === 5) {
    return data[0];
  } else if (category === 4) {
    return data[1];
  } else if (category === 3) {
    return data[2];
  } else {
    return data[3];
  }
}

@Pipe({
  name: 'notation',
  standalone: true
})

export class NotationPipe implements PipeTransform {
  transform(value: number): string {
    return GetNotation(value);
  }
}
