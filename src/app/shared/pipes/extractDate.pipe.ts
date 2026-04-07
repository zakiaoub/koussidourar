import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'extract',
    standalone: true
})
export class ExtractDatePipe implements PipeTransform {
    transform(value: string, format: 'day' | 'month' | 'year'): string {
        if (!value) return '';

        const date = new Date(value);

        switch (format) {
            case 'day':
                return date.getDate().toString().padStart(2, '0');
            case 'month':
                return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'year':
                return date.getFullYear().toString();
            default:
                return '';
        }
    }
}
