import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionCategoryComponent } from './attraction-category.component';

describe('AttractionCategoryComponent', () => {
  let component: AttractionCategoryComponent;
  let fixture: ComponentFixture<AttractionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
