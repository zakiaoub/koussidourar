import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCompanyTimingComponent } from './flight-company-timing.component';

describe('FlightCompanyTimingComponent', () => {
  let component: FlightCompanyTimingComponent;
  let fixture: ComponentFixture<FlightCompanyTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCompanyTimingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightCompanyTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
