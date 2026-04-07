import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPackComponent } from './flight-pack.component';

describe('FlightPackComponent', () => {
  let component: FlightPackComponent;
  let fixture: ComponentFixture<FlightPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightPackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
