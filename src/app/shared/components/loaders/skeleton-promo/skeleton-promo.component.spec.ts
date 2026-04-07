import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPromoComponent } from './skeleton-promo.component';

describe('SkeletonPromoComponent', () => {
  let component: SkeletonPromoComponent;
  let fixture: ComponentFixture<SkeletonPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
