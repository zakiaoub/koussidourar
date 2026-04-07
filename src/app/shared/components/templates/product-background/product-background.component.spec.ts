import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBackgroundComponent } from './product-background.component';

describe('ProductBackgroundComponent', () => {
  let component: ProductBackgroundComponent;
  let fixture: ComponentFixture<ProductBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
