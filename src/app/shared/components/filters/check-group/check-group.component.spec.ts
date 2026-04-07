import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckGroupComponent } from './check-group.component';

describe('CheckGroupComponent', () => {
  let component: CheckGroupComponent;
  let fixture: ComponentFixture<CheckGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
