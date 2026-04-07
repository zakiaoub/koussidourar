import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'random',
  standalone: true
})

export class RandomNumberPipe implements PipeTransform {
  transform(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
