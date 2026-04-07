import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAttractionRecapComponent } from './checkout-attraction-recap.component';

describe('CheckoutAttractionRecapComponent', () => {
  let component: CheckoutAttractionRecapComponent;
  let fixture: ComponentFixture<CheckoutAttractionRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutAttractionRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutAttractionRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
