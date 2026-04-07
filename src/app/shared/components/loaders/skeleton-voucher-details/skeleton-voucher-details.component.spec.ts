import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonVoucherDetailsComponent } from './skeleton-voucher-details.component';

describe('SkeletonVoucherDetailsComponent', () => {
  let component: SkeletonVoucherDetailsComponent;
  let fixture: ComponentFixture<SkeletonVoucherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonVoucherDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonVoucherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
