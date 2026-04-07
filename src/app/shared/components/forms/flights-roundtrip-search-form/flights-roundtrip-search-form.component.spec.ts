import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsRoundtripSearchFormComponent } from './flights-roundtrip-search-form.component';

describe('FlightsRoundtripSearchFormComponent', () => {
  let component: FlightsRoundtripSearchFormComponent;
  let fixture: ComponentFixture<FlightsRoundtripSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsRoundtripSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsRoundtripSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
