import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityImageComponent } from './city-image.component';

describe('CityImageComponent', () => {
  let component: CityImageComponent;
  let fixture: ComponentFixture<CityImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
