import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsSearchFormComponent } from './bookings-search-form.component';

describe('BookingsSearchFormComponent', () => {
  let component: BookingsSearchFormComponent;
  let fixture: ComponentFixture<BookingsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
