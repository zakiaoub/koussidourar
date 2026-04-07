import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCardHotelComponent } from './map-card-hotel.component';

describe('MapCardHotelComponent', () => {
  let component: MapCardHotelComponent;
  let fixture: ComponentFixture<MapCardHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCardHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCardHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
