import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightClassFilterComponent } from './flight-class-filter.component';

describe('FlightClassFilterComponent', () => {
  let component: FlightClassFilterComponent;
  let fixture: ComponentFixture<FlightClassFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightClassFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightClassFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
