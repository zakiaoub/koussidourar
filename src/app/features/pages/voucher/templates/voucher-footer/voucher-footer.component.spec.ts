import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFooterComponent } from './voucher-footer.component';

describe('VoucherFooterComponent', () => {
  let component: VoucherFooterComponent;
  let fixture: ComponentFixture<VoucherFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
