import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStopoversComponent } from './flight-stopovers.component';

describe('FlightStopoversComponent', () => {
  let component: FlightStopoversComponent;
  let fixture: ComponentFixture<FlightStopoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightStopoversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightStopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
