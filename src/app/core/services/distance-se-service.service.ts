import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DistanceService {

  constructor() { }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)} m`;
    } else {
      return `${distanceKm.toFixed(1)} km`;
    }
  }

  getWalkingTime(lat1: number, lon1: number, lat2: number, lon2: number, speedKmH: number = 5): string {
    const distanceKm = this.getDistanceInKm(lat1, lon1, lat2, lon2);
    const timeH = distanceKm / speedKmH;

    if (timeH < 1) {
      return `${Math.round(timeH * 60)} min`;
    } else {
      const hours = Math.floor(timeH);
      const minutes = Math.round((timeH - hours) * 60);
      return `${hours} h ${minutes} min`;
    }
  }

  private getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
