import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesFieldComponent } from './dates-field.component';

describe('DatesFieldComponent', () => {
  let component: DatesFieldComponent;
  let fixture: ComponentFixture<DatesFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatesFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
