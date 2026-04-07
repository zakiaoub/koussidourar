import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCityComponent } from './loader-city.component';

describe('LoaderCityComponent', () => {
  let component: LoaderCityComponent;
  let fixture: ComponentFixture<LoaderCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
