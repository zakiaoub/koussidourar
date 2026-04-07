import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherHeaderComponent } from './voucher-header.component';

describe('VoucherHeaderComponent', () => {
  let component: VoucherHeaderComponent;
  let fixture: ComponentFixture<VoucherHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
