import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonResultsComponent } from './skeleton-results.component';

describe('SkeletonResultsComponent', () => {
  let component: SkeletonResultsComponent;
  let fixture: ComponentFixture<SkeletonResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
