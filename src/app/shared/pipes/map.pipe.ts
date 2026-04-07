import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map',
    standalone: true
})
export class MapPipe implements PipeTransform {
    transform(
        value: any[] | null | undefined,
        mode: 'min' | 'max',
        key?: string
    ): number {
        if (!value || value.length === 0) return 0;

        let values: number[];
        if (typeof value[0] === 'number') {
            values = value as number[];
        }
        else if (key) {
            values = value
                .map(item => Number(item[key]))
                .filter(v => !isNaN(v));
        } else {
            console.warn('MapPipe: clé non spécifiée pour un tableau d’objets.');
            return 0;
        }

        return mode === 'min' ? Math.min(...values) : Math.max(...values);
    }
}
