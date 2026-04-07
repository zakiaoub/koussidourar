import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsOnewaySearchFormComponent } from './flights-oneway-search-form.component';

describe('FlightsOnewaySearchFormComponent', () => {
  let component: FlightsOnewaySearchFormComponent;
  let fixture: ComponentFixture<FlightsOnewaySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsOnewaySearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsOnewaySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
