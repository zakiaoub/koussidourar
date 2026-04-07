import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCompanyComponent } from './flight-company.component';

describe('FlightCompanyComponent', () => {
  let component: FlightCompanyComponent;
  let fixture: ComponentFixture<FlightCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
