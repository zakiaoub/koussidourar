import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsBookingFormComponent } from './hotels-booking-form.component';

describe('HotelsBookingFormComponent', () => {
  let component: HotelsBookingFormComponent;
  let fixture: ComponentFixture<HotelsBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
