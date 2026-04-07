import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSegmentComponent } from './flight-segment.component';

describe('FlightSegmentComponent', () => {
  let component: FlightSegmentComponent;
  let fixture: ComponentFixture<FlightSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
