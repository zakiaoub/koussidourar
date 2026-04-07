import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRecapComponent } from './checkout-summary.component';

describe('CheckoutRecapComponent', () => {
  let component: CheckoutRecapComponent;
  let fixture: ComponentFixture<CheckoutRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
