import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersBookingFormComponent } from './transfers-booking-form.component';

describe('TransfersBookingFormComponent', () => {
  let component: TransfersBookingFormComponent;
  let fixture: ComponentFixture<TransfersBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
