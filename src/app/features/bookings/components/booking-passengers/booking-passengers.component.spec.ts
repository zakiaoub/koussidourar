import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengersComponent } from './booking-passengers.component';

describe('BookingPassengersComponent', () => {
  let component: BookingPassengersComponent;
  let fixture: ComponentFixture<BookingPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPassengersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
