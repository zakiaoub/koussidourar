import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherOverviewComponent } from './voucher-overview.component';

describe('VoucherOverviewComponent', () => {
  let component: VoucherOverviewComponent;
  let fixture: ComponentFixture<VoucherOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
