import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBlogPostComponent } from './skeleton-blog-post.component';

describe('SkeletonBlogPostComponent', () => {
  let component: SkeletonBlogPostComponent;
  let fixture: ComponentFixture<SkeletonBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBlogPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
