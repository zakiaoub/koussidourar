import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAuthFieldComponent } from './facebook-auth-field.component';

describe('FacebookAuthFieldComponent', () => {
  let component: FacebookAuthFieldComponent;
  let fixture: ComponentFixture<FacebookAuthFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookAuthFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookAuthFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
