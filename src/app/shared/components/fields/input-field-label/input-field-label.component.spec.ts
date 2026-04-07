import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldLabelComponent } from './input-field-label.component';

describe('InputFieldsLabelComponent', () => {
  let component: InputFieldLabelComponent;
  let fixture: ComponentFixture<InputFieldLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
