import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SpinnerComponent } from "@app/shared/components/loaders/spinner/spinner.component";
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { DialogModule } from 'primeng/dialog';
import { DistanceService } from '@app/core/services/distance-se-service.service';
import { ActivatedRoute } from '@angular/router';
import { ReqService } from '@app/core/services/req.service';

interface PlaceType {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-hotel-nearby',
  imports: [CommonModule, TranslationModule, SpinnerComponent, IconComponent, DialogModule],
  templateUrl: './hotel-nearby.component.html',
  styleUrl: './hotel-nearby.component.css'
})

export class HotelNearbyComponent {

  constructor(private distanceService: DistanceService, private route: ActivatedRoute, private api: ReqService) { }

  selectedType: string = '';
  places = signal<any[] | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<boolean>(false);

  @Input() lat: number
  @Input() lon: number
  @Input() radius: number = 1500
  hoteld: number

  options: PlaceType[] = [
    { label: "food", value: "restaurant", icon: "fork-knife" },
    { label: "shopping", value: "shopping_mall", icon: "shop" },
    { label: "attractions", value: "tourist_attraction", icon: "bicycle" },
    { label: "transport", value: "train_station", icon: "train-front-fill" },
    { label: "health", value: "hospital", icon: "hospital" }
  ]

  ngOnInit(): void {
    this.hoteld = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.selectType('restaurant');
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.getData(this.hoteld)
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  getData(id: number) {

    this.isLoading.set(true)

    this.api.get(['hotel', id, 'place', 'nearby', this.selectedType].join('/')).subscribe({
      next: (response: any) => {
        this.places.set(response?.result);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  getDistance(hotelLat: number, hotelLng: number, lat: number, lng: number): string {
    return this.distanceService.getDistance(
      hotelLat,
      hotelLng,
      lat,
      lng
    );
  }

  getWalkingTime(hotelLat: number, hotelLng: number, lat: number, lng: number): string {
    return this.distanceService.getWalkingTime(
      hotelLat,
      hotelLng,
      lat,
      lng
    );
  }
}