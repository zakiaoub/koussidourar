import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRulesComponent } from './flight-rules.component';

describe('FlightRulesComponent', () => {
  let component: FlightRulesComponent;
  let fixture: ComponentFixture<FlightRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
