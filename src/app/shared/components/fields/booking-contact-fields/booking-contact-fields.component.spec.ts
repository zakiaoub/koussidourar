import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContactFieldsComponent } from './booking-contact-fields.component';

describe('BookingContactFieldsComponent', () => {
  let component: BookingContactFieldsComponent;
  let fixture: ComponentFixture<BookingContactFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContactFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContactFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
