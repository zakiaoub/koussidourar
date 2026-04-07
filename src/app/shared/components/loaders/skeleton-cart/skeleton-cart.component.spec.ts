import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCartComponent } from './skeleton-cart.component';

describe('SkeletonCartComponent', () => {
  let component: SkeletonCartComponent;
  let fixture: ComponentFixture<SkeletonCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
