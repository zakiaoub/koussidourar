import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageSizeService {

  constructor() { }

  getLocalStorageSize(): number {
    let total = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    return total / (1024 * 1024);
  }

  getRemainingSpace(): number {
    const totalQuota = 5 * 1024 * 1024;
    const usedSpace = this.getLocalStorageSize();
    return (totalQuota / (1024 * 1024)) - usedSpace;
  }
}
