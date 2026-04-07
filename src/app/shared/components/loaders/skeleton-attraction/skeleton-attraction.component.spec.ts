import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAttractionComponent } from './skeleton-attraction.component';

describe('SkeletonAttractionComponent', () => {
  let component: SkeletonAttractionComponent;
  let fixture: ComponentFixture<SkeletonAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonAttractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
