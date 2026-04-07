import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {

  constructor() {}

  compressImage(imageUrl: string, quality: number = 0.6, maxWidth: number = 1024): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important pour les images externes
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Limite la taille max
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas not supported');

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality); // compression JPEG
        resolve(compressed);
      };

      img.onerror = (err) => reject(err);
    });
  }
}
