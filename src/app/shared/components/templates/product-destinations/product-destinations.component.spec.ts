import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDestinationsComponent } from './product-destinations.component';

describe('ProductDestinationsComponent', () => {
  let component: ProductDestinationsComponent;
  let fixture: ComponentFixture<ProductDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDestinationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
