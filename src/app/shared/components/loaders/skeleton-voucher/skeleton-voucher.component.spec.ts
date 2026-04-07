import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonVoucherComponent } from './skeleton-voucher.component';

describe('SkeletonVoucherComponent', () => {
  let component: SkeletonVoucherComponent;
  let fixture: ComponentFixture<SkeletonVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
