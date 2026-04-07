import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDisplaySmallComponent } from './form-display-small.component';

describe('FormDisplaySmallComponent', () => {
  let component: FormDisplaySmallComponent;
  let fixture: ComponentFixture<FormDisplaySmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDisplaySmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDisplaySmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
