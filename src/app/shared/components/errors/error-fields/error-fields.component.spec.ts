import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFieldsComponent } from './error-fields.component';

describe('ErrorFieldsComponent', () => {
  let component: ErrorFieldsComponent;
  let fixture: ComponentFixture<ErrorFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
