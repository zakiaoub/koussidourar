import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceReasonsComponent } from './choice-reasons.component';

describe('ChoiceReasonsComponent', () => {
  let component: ChoiceReasonsComponent;
  let fixture: ComponentFixture<ChoiceReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceReasonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
