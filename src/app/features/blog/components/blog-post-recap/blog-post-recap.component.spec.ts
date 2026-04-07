import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostRecapComponent } from './blog-post-recap.component';

describe('BlogPostRecapComponent', () => {
  let component: BlogPostRecapComponent;
  let fixture: ComponentFixture<BlogPostRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
