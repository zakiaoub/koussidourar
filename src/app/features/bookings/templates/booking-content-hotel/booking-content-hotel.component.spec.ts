import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContentHotelComponent } from './booking-content-hotel.component';

describe('BookingContentHotelComponent', () => {
  let component: BookingContentHotelComponent;
  let fixture: ComponentFixture<BookingContentHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContentHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContentHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
