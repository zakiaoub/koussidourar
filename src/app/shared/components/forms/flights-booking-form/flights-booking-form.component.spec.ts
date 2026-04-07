import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsBookingFormComponent } from './flights-booking-form.component';

describe('FlightsBookingFormComponent', () => {
  let component: FlightsBookingFormComponent;
  let fixture: ComponentFixture<FlightsBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
