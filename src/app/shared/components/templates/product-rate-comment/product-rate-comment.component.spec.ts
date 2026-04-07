import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRateCommentComponent } from './product-rate-comment.component';

describe('ProductRateCommentComponent', () => {
  let component: ProductRateCommentComponent;
  let fixture: ComponentFixture<ProductRateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRateCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
