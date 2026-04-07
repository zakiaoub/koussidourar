import { Pipe, PipeTransform } from '@angular/core';
import { from, Observable } from 'rxjs';

@Pipe({ name: 'compress' })
export class CompressImagePipe implements PipeTransform {
    transform(url: string, size: number = 1024, quality: number = 0.8): Observable<string> {
        return from(this.compress(url, quality, size));
    }

    private compress(url: string, quality: number, size: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            img.onload = () => {
                let { width, height } = img;
                if (width > size) {
                    height = (height * size) / width;
                    width = size;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('Canvas not supported');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => {
                resolve(url);
            };
        });
    }
}
