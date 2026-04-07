import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StopoverService {

  getStopovers(segments: any[]): { airport: string, code: string, duration: string }[] {
    if (!segments || segments.length < 2) return [];

    const stopovers = [];

    for (let i = 0; i < segments.length - 1; i++) {
      const arrivalSeg = segments[i];
      const nextSeg = segments[i + 1];

      const arrivalTime = new Date(arrivalSeg.ArrivalDateTime);
      const nextDepartureTime = new Date(nextSeg.DepartureDateTime);

      const diffMs = nextDepartureTime.getTime() - arrivalTime.getTime();
      const diffMin = Math.floor(diffMs / 60000);

      const hours = Math.floor(diffMin / 60);
      const minutes = diffMin % 60;
      const duration = `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m`;

      stopovers.push({
        airport: arrivalSeg.ArrivalAirportName || arrivalSeg.ArrivalAirportCode,
        code: arrivalSeg.ArrivalAirportCode,
        duration
      });
    }

    return stopovers;
  }

}
