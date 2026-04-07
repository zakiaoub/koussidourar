import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStepComponent } from './products-step.component';

describe('ProductsStepComponent', () => {
  let component: ProductsStepComponent;
  let fixture: ComponentFixture<ProductsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
