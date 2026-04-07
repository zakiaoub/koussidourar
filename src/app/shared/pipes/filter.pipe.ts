import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], id: string, key: string): any {
        if (!items || !id || !key) {
            return null;
        }

        const foundItem = items.find(item => item.id === id);
        return foundItem ? foundItem[key] : null;
    }
}
