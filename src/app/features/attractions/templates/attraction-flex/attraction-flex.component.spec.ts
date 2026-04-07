import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionFlexComponent } from './attraction-flex.component';

describe('FlexAttractionComponent', () => {
  let component: AttractionFlexComponent;
  let fixture: ComponentFixture<AttractionFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionFlexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
