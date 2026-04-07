import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSwitchComponent } from './line-switch.component';

describe('LineSwitchComponent', () => {
  let component: LineSwitchComponent;
  let fixture: ComponentFixture<LineSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
