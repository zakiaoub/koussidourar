import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfosComponent } from './product-infos.component';

describe('ProductInfosComponent', () => {
  let component: ProductInfosComponent;
  let fixture: ComponentFixture<ProductInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
