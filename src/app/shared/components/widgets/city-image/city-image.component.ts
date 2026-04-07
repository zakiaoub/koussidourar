import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import cities from '@assets/json/imagesCities.json'
import { CityImageService } from '@app/core/services/city-image.service';

@Component({
  selector: 'app-city-image',
  imports: [CommonModule, FormsModule],
  templateUrl: './city-image.component.html',
  styleUrl: './city-image.component.css'
})
export class CityImageComponent {

  cities = cities


  @Input() height: string = '100%';
  @Input() city: string;
  @Input() orientation: string = 'portrait';
  @Input() imgIndex: number = 0;
  imageUrl: string | null = null;

  constructor(private cityImageService: CityImageService) { }



  private ensureOrientation(): 'portrait' | 'landscape' | 'squarish' {
    if (['portrait', 'landscape', 'squarish'].includes(this.orientation)) {
      return this.orientation as 'portrait' | 'landscape' | 'squarish';
    }
    return 'portrait'; // valeur par défaut si invalide
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.cityImageService.getCityPhoto(this.city, this.ensureOrientation())
        .subscribe((res) => {
          this.imageUrl = res.results?.[this.imgIndex]?.urls?.regular ?? null;
        });
    }
  }

}
