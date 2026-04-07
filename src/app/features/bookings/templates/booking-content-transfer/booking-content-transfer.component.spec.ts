import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContentTransferComponent } from './booking-content-transfer.component';

describe('BookingContentTransferComponent', () => {
  let component: BookingContentTransferComponent;
  let fixture: ComponentFixture<BookingContentTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContentTransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContentTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
