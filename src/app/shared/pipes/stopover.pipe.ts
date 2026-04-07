import { Pipe, PipeTransform } from '@angular/core';
import { StopoverService } from '@app/core/services/stopover.service';

@Pipe({
  name: 'stopover'
})

export class StopoverPipe implements PipeTransform {

  constructor(private stop: StopoverService) { }

  transform(segments: any[], type: string, index?: number): any {
    switch (type) {
      case 'stopovers':
      const stops = this.stop.getStopovers(segments);
      return index !== undefined ? stops[index] : stops;

        case 'count':
          return this.stop.getStopovers(segments).length;

      default:
        return '';
    }
  }

}
