import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherRateCommentComponent } from './voucher-rate-comment.component';

describe('VoucherRateCommentComponent', () => {
  let component: VoucherRateCommentComponent;
  let fixture: ComponentFixture<VoucherRateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherRateCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherRateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
