import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonFlightComponent } from './skeleton-flight.component';

describe('SkeletonFlightComponent', () => {
  let component: SkeletonFlightComponent;
  let fixture: ComponentFixture<SkeletonFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
