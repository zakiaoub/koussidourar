import { Component, Input, ViewChild, ElementRef, signal, input } from '@angular/core';
import { RatingComponent } from '@app/shared/components/widgets/rating/rating.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { DefaultImagesService } from '@app/core/services/default-images.service';
import { GoogleMapsModule } from '@angular/google-maps';
import defaultImages from "@assets/json/defaultImages.json"
import { NotationPipe } from '@app/shared/pipes/notation.pipe';
import { FixedPipe } from '@app/shared/pipes/fixed.pipe';
import { ReqService } from '@app/core/services/req.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ToastService } from '@app/core/services/toast.service';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { AdAttractionComponent } from '@app/shared/components/banner/ad-attraction/ad-attraction.component';

declare global {
  interface Document {
    webkitFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
  }
  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

@Component({
  selector: 'app-hotel-flex',
  standalone: true,
  imports: [
    RatingComponent,
    TranslationModule,
    CommonModule,
    NotationPipe,
    FixedPipe,
    IconComponent,
    AmountComponent,
    GoogleMapsModule,
    ButtonComponent,
    SpinnerComponent,
    AdAttractionComponent
  ],
  templateUrl: './hotel-flex.component.html',
  styleUrl: './hotel-flex.component.css'
})

export class HotelFlexComponent {

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(public dis: DefaultImagesService, private api: ReqService, private toast: ToastService) { }

  @Input() items!: any;
  @Input() searchToken!: any;

  isTruePriceLoad = input<boolean>(false)

  isLoading = signal<Record<string, boolean>>({});
  defaultImages: string[] = defaultImages.hotels
  selectedHotel: any = null;

  showMap: boolean = false;
  isMapLoaded: boolean = false;
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true
  };

  async openMapForHotel(hotel: any): Promise<void> {
    this.selectedHotel = hotel;
    this.showMap = true;
    this.isMapLoaded = false;

    this.mapOptions = {
      ...this.mapOptions,
      center: {
        lat: parseFloat(hotel.latitude),
        lng: parseFloat(hotel.longitude)
      }
    };

    setTimeout(() => {
      this.enterFullscreen();
    }, 100);
  }

  getRooms(hotel: any) {
    this.isLoading.update(prev => ({ ...prev, [hotel.id]: true }));

    this.api.get(['hotel', 'rooms', hotel.id, this.searchToken].join('/')).subscribe({
      next: () => {
        window.open(['hotels', hotel.country_code, hotel.roomsCount, hotel.adultCount, hotel.childCount, hotel.nights, hotel.id, this.searchToken].join('/'))
        this.isLoading.update(prev => ({ ...prev, [hotel.id]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [hotel.id]: false }));
      }
    })
  }

  enterFullscreen(): void {
    const element = this.mapContainer?.nativeElement;

    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }

      document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
      document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange());
      document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange());
      document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange());
    }
  }

  onFullscreenChange(): void {
    if (!document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
      this.closeMap();
    }
  }

  onMapReady(): void {
    this.isMapLoaded = true;
  }

  closeMap(): void {
    this.showMap = false;
    this.selectedHotel = null;
    this.isMapLoaded = false;
  }

  toFloat(value: string): number {
    return parseFloat(value);
  }

  Disabled() {
    alert("Cette option est désactivée tomporairement !!!")
  }
}