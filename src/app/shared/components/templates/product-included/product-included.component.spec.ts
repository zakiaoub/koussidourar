import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIncludedComponent } from './product-included.component';

describe('ProductIncludedComponent', () => {
  let component: ProductIncludedComponent;
  let fixture: ComponentFixture<ProductIncludedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductIncludedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIncludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
