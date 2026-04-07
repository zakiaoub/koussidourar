import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsPreviewComponent } from './blog-posts-preview.component';

describe('BlogPostsPreviewComponent', () => {
  let component: BlogPostsPreviewComponent;
  let fixture: ComponentFixture<BlogPostsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
