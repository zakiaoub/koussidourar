import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseData',
    standalone:true
})
export class ParseDataPipe implements PipeTransform {

    transform(value: any, type: 'encode' | 'decode'): any {
        if (!value) return '';

        try {
            if (type === 'encode') {
                return encodeURIComponent(JSON.stringify(value));
            } else if (type === 'decode') {
                return JSON.parse(decodeURIComponent(value));
            }
        } catch (error) {
            console.error('Erreur dans ParseDataPipe', error);
            return value;
        }
    }
}

