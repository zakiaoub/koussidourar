import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-rating',
    imports: [CommonModule],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.css'
})
export class RatingComponent {

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() showEmptyStars: boolean = true;

  readonly maxStars: number = 5;

  rate(star: number) {
    if (!this.readonly) {
      this.rating = star;
      this.ratingChange.emit(this.rating);
    }
  }
  
}
