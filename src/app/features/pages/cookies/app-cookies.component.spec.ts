import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCookiesComponent } from './app-cookies.component';

describe('AppCookiesComponent', () => {
  let component: AppCookiesComponent;
  let fixture: ComponentFixture<AppCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
