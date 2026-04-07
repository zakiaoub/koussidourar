import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLoaderComponent } from './flight-loader.component';

describe('FlightLoaderComponent', () => {
  let component: FlightLoaderComponent;
  let fixture: ComponentFixture<FlightLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
