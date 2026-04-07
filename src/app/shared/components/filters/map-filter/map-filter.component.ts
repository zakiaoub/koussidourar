import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../widgets/button/button.component';
import { MapCardHotelComponent } from "@app/features/hotels/templates/map-card-hotel/map-card-hotel.component";
import { Component, ElementRef, Input, QueryList, signal, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AmountService } from '@app/core/services/amount-service.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import mapStyle from '@assets/json/map.json'
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ReqService } from '@app/core/services/req.service';
import { AmountComponent } from '../../settings/components/amount/amount.component';

interface Hotel {
    id: number;
    name: string;
    country_code: string;
    address: string;
    image: string;
    category: number;
    latitude: string;
    longitude: string;
    trip_advisor_rating: number;
    trip_advisor_review_count: number;
    trip_advisor_reviews: string;
    trip_advisor_rating_image: string;
    chain_id: string;
    hotel_type_id: number;
    ranking: number;
    country_name: string;
    city_name: string;
    currency: string;
    amount: number;
    note: number;
    roomsCount: number;
    adultCount: number;
    childCount: number;
    nights: number;
    amenities: string[];
    description: string;
}

interface HotelMarker {
    position: google.maps.LatLngLiteral;
    title: string;
    hotel: Hotel;
    options: google.maps.MarkerOptions;
}

@Component({
    selector: 'app-map-filter',
    imports: [TranslationModule, GoogleMap, Dialog, CommonModule, ButtonComponent, MapMarker, MapCardHotelComponent, MapInfoWindow, AmountComponent, IconComponent, FormsModule, Checkbox],
    templateUrl: './map-filter.component.html',
    styleUrl: './map-filter.component.scss'
})

export class MapFilterComponent {

    constructor(private amountService: AmountService, private api: ReqService) { }

    @Input() data: Hotel[] = [];
    @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
    @ViewChildren(MapMarker) mapMarkers!: QueryList<MapMarker>;
    @ViewChild('hotelListContainer') hotelListContainer!: ElementRef;
    @ViewChild(GoogleMap) map!: GoogleMap;

    visible: boolean = false;
    isLoading: boolean = false;
    darkMode: boolean = false;
    center: google.maps.LatLngLiteral = { lat: 48.8566, lng: 2.3522 };
    zoom = 13;

    disableMapOptions: google.maps.MapOptions = {
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        clickableIcons: false,
        styles: this.darkMode ? mapStyle.dark : mapStyle.light
    };

    mapOptions: google.maps.MapOptions = {
        mapTypeId: 'roadmap',
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        maxZoom: 15,
        minZoom: 8,
        styles: this.darkMode ? mapStyle.dark : mapStyle.light

    };

    markers: HotelMarker[] = [];
    selectedHotel: Hotel | null = null;
    hoveredHotelId: number | null = null;
    @Input() searchToken!: any;
    isSubmiting = signal<Record<string, boolean>>({});

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data'] && this.data?.length) {
            this.initializeMap();
        }
    }

    onDarkModeChange() {
        this.mapOptions = {
            ...this.mapOptions,
            styles: this.darkMode ? mapStyle.dark : mapStyle.light
        };
    }

    showDialog() {
        this.isLoading = true;
        setTimeout(() => {
            this.visible = true;
            this.isLoading = false;
        }, 500);
    }

    initializeMap() {
        if (this.data && this.data.length > 0) {
            this.markers = this.data.map(hotel => ({
                position: {
                    lat: parseFloat(hotel.latitude),
                    lng: parseFloat(hotel.longitude)
                },
                title: hotel.name,
                hotel: hotel,
                options: {
                    icon: {
                        url: this.createPriceMarker(hotel),
                        scaledSize: new google.maps.Size(80, 40),
                        anchor: new google.maps.Point(40, 40)
                    }
                }
            }));

            if (this.markers.length === 1) {
                this.center = this.markers[0].position;
            } else {
                this.calculateCenter();
            }
        }
    }

    createPriceMarker(hotel: Hotel): string {
        const amount = Math.round(this.amountService.calculateAmount(hotel.amount));
        const currency = this.amountService.getCurrency()
        const symbol = (0).toLocaleString('fr-FR', { style: 'currency', currency: currency })
            .replace(/\d|,|\.| /g, '').trim();

        const price = new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);

        const text = `${price} ${symbol}`;
        const fontSize = text.length > 5 ? 10 : 13;

        const svg = `
        <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
        
          <rect x="5" y="5" width="70" height="26" rx="4" fill="#f7732c" filter="url(#shadow)"/>
          <rect x="6" y="6" width="68" height="24" rx="3" fill="none" stroke="white" stroke-width="1.5"/>
          <text x="40" y="21" font-size="${fontSize}" font-weight="bold" 
                fill="white" text-anchor="middle">${text}</text>
          <path d="M 35 31 L 40 36 L 45 31 Z" fill="#f7732c" filter="url(#shadow)"/>
        </svg>`;

        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    calculateCenter() {
        if (this.markers.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        this.markers.forEach(marker => {
            bounds.extend(marker.position);
        });

        const center = bounds.getCenter();
        this.center = { lat: center.lat(), lng: center.lng() };
    }

    openInfoWindow(marker: MapMarker, hotelMarker: HotelMarker) {
        this.selectedHotel = hotelMarker.hotel;
        this.infoWindow.open(marker);

        // Scroll vers l'hôtel dans la liste
        this.scrollToHotelInList(hotelMarker.hotel.id);
    }

    selectHotelFromList(hotel: Hotel) {
        const markerIndex = this.markers.findIndex(m => m.hotel.id === hotel.id);
        if (markerIndex === -1) return;

        const marker = this.mapMarkers.toArray()[markerIndex];
        const hotelMarker = this.markers[markerIndex];

        this.selectedHotel = hotel;

        const nativeMap = this.map.googleMap;
        if (!nativeMap) return;

        nativeMap.panTo(hotelMarker.position);

        const targetZoom = 15;
        const currentZoom = nativeMap.getZoom() ?? targetZoom;

        if (currentZoom < targetZoom) {
            setTimeout(() => nativeMap.setZoom(targetZoom), 300);
        }

        this.infoWindow.open(marker);
    }

    scrollToHotelInList(hotelId: number) {
        setTimeout(() => {
            const hotelIndex = this.data.findIndex(h => h.id === hotelId);
            if (hotelIndex !== -1 && this.hotelListContainer) {
                const container = this.hotelListContainer.nativeElement;
                const hotelCards = container.querySelectorAll('.hotel-card');

                if (hotelCards[hotelIndex]) {
                    const hotelCard = hotelCards[hotelIndex] as HTMLElement;
                    hotelCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }, 100);
    }

    getRooms(hotel: any) {
        this.isSubmiting.update(prev => ({ ...prev, [hotel.id]: true }));

        this.api.get(['hotel', 'rooms', hotel.id, this.searchToken].join('/')).subscribe({
            next: () => {
                window.open(['hotels', hotel.country_code, hotel.roomsCount, hotel.adultCount, hotel.childCount, hotel.nights, hotel.id, this.searchToken].join('/'))
                this.isSubmiting.update(prev => ({ ...prev, [hotel.id]: false }));
            },
            error: () => {
                this.isSubmiting.update(prev => ({ ...prev, [hotel.id]: false }));
            }
        })
    }
}


