import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFlightComponent } from './voucher-flight.component';

describe('VoucherFlightComponent', () => {
  let component: VoucherFlightComponent;
  let fixture: ComponentFixture<VoucherFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
