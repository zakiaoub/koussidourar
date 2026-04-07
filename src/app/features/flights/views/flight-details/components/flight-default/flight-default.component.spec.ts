import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDefaultComponent } from './flight-default.component';

describe('FlightDefaultComponent', () => {
  let component: FlightDefaultComponent;
  let fixture: ComponentFixture<FlightDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
