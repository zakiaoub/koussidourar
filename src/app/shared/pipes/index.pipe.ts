import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'index' })
export class IndexPipe implements PipeTransform {
  transform(obj: any, key: any): any {
    return obj ? obj[key] : null;
  }
}