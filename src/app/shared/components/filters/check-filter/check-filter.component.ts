import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-check-filter',
    imports: [TranslationModule, CommonModule],
    templateUrl: './check-filter.component.html',
    styleUrl: './check-filter.component.css'
})
export class CheckFilterComponent {

  @Input() data: any;
  @Input() title: string = '';

  showAll = false;

  get displayedData(): any[] {
    return this.showAll ? this.data : this.data.slice(0, 4);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }
}
