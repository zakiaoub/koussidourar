import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsFieldComponent } from './rooms-field.component';

describe('RoomsFieldComponent', () => {
  let component: RoomsFieldComponent;
  let fixture: ComponentFixture<RoomsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
