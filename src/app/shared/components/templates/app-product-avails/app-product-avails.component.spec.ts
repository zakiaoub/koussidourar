import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductAvailsComponent } from './app-product-avails.component';

describe('AppProductAvailsComponent', () => {
  let component: AppProductAvailsComponent;
  let fixture: ComponentFixture<AppProductAvailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProductAvailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProductAvailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
