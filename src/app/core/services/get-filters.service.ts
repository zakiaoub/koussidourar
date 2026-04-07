import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GetFiltersService {

  constructor() { }

  toggleSelection(selectedItems: string[], item: string, checked?: boolean): string[] {
    if (checked === undefined) {
      checked = !selectedItems.includes(item);
    }

    if (checked) {
      if (!selectedItems.includes(item)) {
        return [...selectedItems, item];
      }
    } else {
      return selectedItems.filter(i => i !== item);
    }

    return selectedItems;
  }

  getTimeIcon(time: string) {
    const icons = {
      early: { icon: 'sunrise', color: '#24D674' },
      midday: { icon: 'sun', color: '#E25F0D' },
      evening: { icon: 'sunset', color: '#D38A24' },
      late: { icon: 'moon', color: '#248DEA' },
      night: { icon: 'stars', color: '#A080F8' }
    };

    const [hour] = time.split(':').map(Number);

    if (hour >= 6 && hour < 11) return icons.early;
    if (hour >= 11 && hour < 17) return icons.midday;
    if (hour >= 17 && hour < 20) return icons.evening;
    if (hour >= 20 && hour < 24) return icons.late;
    return icons.night;
  }
}
