import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonFaqComponent } from './skeleton-faq.component';

describe('SkeletonFaqComponent', () => {
  let component: SkeletonFaqComponent;
  let fixture: ComponentFixture<SkeletonFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
