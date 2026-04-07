import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaxesFieldsComponent } from './booking-paxes-fields.component';

describe('BookingPaxesFieldsComponent', () => {
  let component: BookingPaxesFieldsComponent;
  let fixture: ComponentFixture<BookingPaxesFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPaxesFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPaxesFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
