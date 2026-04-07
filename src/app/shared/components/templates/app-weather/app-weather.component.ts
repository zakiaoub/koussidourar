import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { signal } from '@angular/core';
import { FixedPipe } from '@app/shared/pipes/fixed.pipe';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslationModule, DialogModule, CityImageComponent, FixedPipe],
  templateUrl: './app-weather.component.html',
  styleUrl: './app-weather.component.css'
})

export class WeatherComponent implements OnInit {

  constructor(private api: ReqService) { }

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  date: Date = new Date()
  visible: boolean = false;

  @Input() lat: number
  @Input() lon: number
  @Input() city: string

  selectedIndex: number = 0

  selectIndex(index: number) {
    this.selectedIndex = index
  }

  ngOnInit() {
    this.getWeatherData()
  }

  getWeatherData() {

    this.isLoading.set(true)

    const payload = {
      latitude: this.lat,
      longitude: this.lon
    }

    this.api.post(['weather', 'daily'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.data.set(response?.result?.forecastDays);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  showDialog() {
    this.visible = true;
  }
}