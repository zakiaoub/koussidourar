import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'array',
    standalone: true
})
export class ArrayPipe implements PipeTransform {
    transform(items: any[], property: string): any[] {
        if (!Array.isArray(items) || !property) {
            return [];
        }
        return items.map(item => item[property]).filter(value => value !== undefined);
    }
}
