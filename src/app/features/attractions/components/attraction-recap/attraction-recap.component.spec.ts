import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionRecapComponent } from './attraction-recap.component';

describe('AttractionRecapComponent', () => {
  let component: AttractionRecapComponent;
  let fixture: ComponentFixture<AttractionRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
