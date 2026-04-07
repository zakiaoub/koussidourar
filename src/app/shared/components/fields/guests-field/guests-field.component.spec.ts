import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsFieldComponent } from './guests-field.component';

describe('GuestsFieldComponent', () => {
  let component: GuestsFieldComponent;
  let fixture: ComponentFixture<GuestsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
