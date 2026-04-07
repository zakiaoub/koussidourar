import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBookingsComponent } from './skeleton-bookings.component';

describe('SkeletonBookingsComponent', () => {
  let component: SkeletonBookingsComponent;
  let fixture: ComponentFixture<SkeletonBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
