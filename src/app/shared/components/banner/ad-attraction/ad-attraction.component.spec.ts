import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAttractionComponent } from './ad-attraction.component';

describe('AdAttractionComponent', () => {
  let component: AdAttractionComponent;
  let fixture: ComponentFixture<AdAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdAttractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
