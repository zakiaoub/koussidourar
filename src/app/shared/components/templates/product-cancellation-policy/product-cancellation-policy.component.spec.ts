import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCancellationPolicyComponent } from './product-cancellation-policy.component';

describe('ProductCancellationPolicyComponent', () => {
  let component: ProductCancellationPolicyComponent;
  let fixture: ComponentFixture<ProductCancellationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCancellationPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCancellationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
