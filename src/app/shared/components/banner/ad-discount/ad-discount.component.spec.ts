import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDiscountComponent } from './ad-discount.component';

describe('AdDiscountComponent', () => {
  let component: AdDiscountComponent;
  let fixture: ComponentFixture<AdDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
