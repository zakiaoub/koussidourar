import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFlightRecapComponent } from './checkout-flight-recap.component';

describe('CheckoutFlightRecapComponent', () => {
  let component: CheckoutFlightRecapComponent;
  let fixture: ComponentFixture<CheckoutFlightRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutFlightRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutFlightRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
