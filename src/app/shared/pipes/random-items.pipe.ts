import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomItems'
})
export class RandomItemsPipe implements PipeTransform {

  transform<T>(value: T[], limit: number): T[] {
    if (!Array.isArray(value) || limit <= 0) return [];

    const shuffled = [...value].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit); 
  }

}
