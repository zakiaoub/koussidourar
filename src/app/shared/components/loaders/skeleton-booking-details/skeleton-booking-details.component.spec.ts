import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBookingDetailsComponent } from './skeleton-booking-details.component';

describe('SkeletonBookingDetailsComponent', () => {
  let component: SkeletonBookingDetailsComponent;
  let fixture: ComponentFixture<SkeletonBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBookingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
