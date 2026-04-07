import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRecapComponent } from './hotel-recap.component';

describe('HotelRecapComponent', () => {
  let component: HotelRecapComponent;
  let fixture: ComponentFixture<HotelRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
