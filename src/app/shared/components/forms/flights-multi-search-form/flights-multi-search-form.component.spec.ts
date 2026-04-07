import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsMultiSearchFormComponent } from './flights-multi-search-form.component';

describe('FlightsMultiSearchFormComponent', () => {
  let component: FlightsMultiSearchFormComponent;
  let fixture: ComponentFixture<FlightsMultiSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsMultiSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsMultiSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
