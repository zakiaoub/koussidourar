import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersFormFieldsComponent } from './transfers-form-fields.component';

describe('TransfersFormFieldsComponent', () => {
  let component: TransfersFormFieldsComponent;
  let fixture: ComponentFixture<TransfersFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersFormFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
