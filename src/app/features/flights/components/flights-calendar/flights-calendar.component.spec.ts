import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsCalendarComponent } from './flights-calendar.component';

describe('FlightsCalendarComponent', () => {
  let component: FlightsCalendarComponent;
  let fixture: ComponentFixture<FlightsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
