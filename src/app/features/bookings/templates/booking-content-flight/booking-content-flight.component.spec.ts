import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContentFlightComponent } from './booking-content-flight.component';

describe('BookingContentFlightComponent', () => {
  let component: BookingContentFlightComponent;
  let fixture: ComponentFixture<BookingContentFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContentFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContentFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
