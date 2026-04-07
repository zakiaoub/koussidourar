import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsPricingComponent } from './tenants-pricing.component';

describe('TenantsPricingComponent', () => {
  let component: TenantsPricingComponent;
  let fixture: ComponentFixture<TenantsPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantsPricingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TenantsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
