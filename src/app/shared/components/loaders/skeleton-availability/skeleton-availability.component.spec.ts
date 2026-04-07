import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAvailabilityComponent } from './skeleton-availability.component';

describe('SkeletonAvailabilityComponent', () => {
  let component: SkeletonAvailabilityComponent;
  let fixture: ComponentFixture<SkeletonAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
