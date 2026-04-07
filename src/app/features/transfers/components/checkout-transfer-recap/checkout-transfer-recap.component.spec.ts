import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTransferRecapComponent } from './checkout-transfer-recap.component';

describe('CheckoutTransferRecapComponent', () => {
  let component: CheckoutTransferRecapComponent;
  let fixture: ComponentFixture<CheckoutTransferRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutTransferRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutTransferRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
