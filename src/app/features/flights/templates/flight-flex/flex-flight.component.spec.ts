import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightFlex } from './flight-flex.component';

describe('FlexFlightComponent', () => {
  let component: FlightFlex;
  let fixture: ComponentFixture<FlightFlex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightFlex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightFlex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
