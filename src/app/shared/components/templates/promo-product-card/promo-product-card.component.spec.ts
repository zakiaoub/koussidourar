import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductCardComponent } from './promo-product-card.component';

describe('PromoProductCardComponent', () => {
  let component: PromoProductCardComponent;
  let fixture: ComponentFixture<PromoProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
