import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsItineraryComponent } from './flights-itinerary.component';

describe('FlightsItineraryComponent', () => {
  let component: FlightsItineraryComponent;
  let fixture: ComponentFixture<FlightsItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsItineraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
