import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultImagesService {

  constructor() { }

  getRandomImage(fallbackImages: string[] | string): string {
    if (!fallbackImages) return '';

    if (typeof fallbackImages === 'string') return fallbackImages;

    if (Array.isArray(fallbackImages) && fallbackImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackImages.length);
      return fallbackImages[randomIndex];
    }

    return '';
  }

  handleImgError(event: Event, fallbackImages: string[] | string) {
    const img = event.target as HTMLImageElement;
    img.src = this.getRandomImage(fallbackImages);
  }
}
