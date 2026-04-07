import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsNumbersComponent } from './bookings-numbers.component';

describe('BookingsNumbersComponent', () => {
  let component: BookingsNumbersComponent;
  let fixture: ComponentFixture<BookingsNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
