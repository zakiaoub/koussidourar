import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthFieldComponent } from './google-auth-field.component';

describe('GoogleAuthComponent', () => {
  let component: GoogleAuthFieldComponent;
  let fixture: ComponentFixture<GoogleAuthFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
