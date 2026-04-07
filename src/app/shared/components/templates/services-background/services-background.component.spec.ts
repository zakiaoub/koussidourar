import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBackgroundComponent } from './services-background.component';

describe('ServicesBackgroundComponent', () => {
  let component: ServicesBackgroundComponent;
  let fixture: ComponentFixture<ServicesBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
