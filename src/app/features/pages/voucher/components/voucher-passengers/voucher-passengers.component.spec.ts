import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPassengersComponent } from './voucher-passengers.component';

describe('VoucherPassengersComponent', () => {
  let component: VoucherPassengersComponent;
  let fixture: ComponentFixture<VoucherPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherPassengersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
