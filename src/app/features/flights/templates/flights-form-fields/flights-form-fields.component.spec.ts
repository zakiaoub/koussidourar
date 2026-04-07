import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsFormFieldsComponent } from './flights-form-fields.component';

describe('FlightsFormFieldsComponent', () => {
  let component: FlightsFormFieldsComponent;
  let fixture: ComponentFixture<FlightsFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsFormFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
