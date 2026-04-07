import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBookingComponent } from './skeleton-booking.component';

describe('SkeletonBookingComponent', () => {
  let component: SkeletonBookingComponent;
  let fixture: ComponentFixture<SkeletonBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
