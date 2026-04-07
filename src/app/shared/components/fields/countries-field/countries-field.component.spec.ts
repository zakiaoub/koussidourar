import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesFieldComponent } from './countries-field.component';

describe('CountriesFieldComponent', () => {
  let component: CountriesFieldComponent;
  let fixture: ComponentFixture<CountriesFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
