import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsBookingFormComponent } from './attractions-booking-form.component';

describe('AttractionsBookingFormComponent', () => {
  let component: AttractionsBookingFormComponent;
  let fixture: ComponentFixture<AttractionsBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
