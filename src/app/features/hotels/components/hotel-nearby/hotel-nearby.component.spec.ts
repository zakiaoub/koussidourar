import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelNearbyComponent } from './hotel-nearby.component';

describe('HotelNearbyComponent', () => {
  let component: HotelNearbyComponent;
  let fixture: ComponentFixture<HotelNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelNearbyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
