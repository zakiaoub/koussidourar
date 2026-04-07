import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTransfertComponent } from './voucher-transfert.component';

describe('VoucherTransfertComponent', () => {
  let component: VoucherTransfertComponent;
  let fixture: ComponentFixture<VoucherTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherTransfertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
