import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutHotelRecapComponent } from './checkout-hotel-recap.component';

describe('CheckoutHotelRecapComponent', () => {
  let component: CheckoutHotelRecapComponent;
  let fixture: ComponentFixture<CheckoutHotelRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutHotelRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutHotelRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
