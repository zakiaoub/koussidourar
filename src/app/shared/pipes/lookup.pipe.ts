import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookup',
  standalone: true
})
export class LookupPipe implements PipeTransform {
  /**
   * @param items Le tableau d'objets
   * @param value La valeur à chercher
   * @param key La clé à comparer avec la valeur
   */
  transform(items: any[], value: string, key: string): any {
    if (!items || !value || !key) {
      return null;
    }
    return items.find(item => item[key] === value) || null;
  }
}
