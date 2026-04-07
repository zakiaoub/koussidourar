import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsOverviewComponent } from './flights-overview.component';

describe('FlightsOverviewComponent', () => {
  let component: FlightsOverviewComponent;
  let fixture: ComponentFixture<FlightsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
