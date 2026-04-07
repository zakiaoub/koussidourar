import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherAttractionComponent } from './voucher-attraction.component';

describe('VoucherAttractionComponent', () => {
  let component: VoucherAttractionComponent;
  let fixture: ComponentFixture<VoucherAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherAttractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
