import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAmentiesComponent } from './product-amenties.component';

describe('ProductAmentiesComponent', () => {
  let component: ProductAmentiesComponent;
  let fixture: ComponentFixture<ProductAmentiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAmentiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAmentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
