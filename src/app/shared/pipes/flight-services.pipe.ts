import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'services'
})
export class FlightServicesPipe implements PipeTransform {

  transform(items: { Value: string }[], keyword: string): boolean {
    if (!Array.isArray(items) || !keyword) return false;
  
    return items.some(item =>
      typeof item.Value === 'string' &&
      item.Value.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
}
