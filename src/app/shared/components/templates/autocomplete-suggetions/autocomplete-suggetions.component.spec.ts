import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSuggetionsComponent } from './autocomplete-suggetions.component';

describe('AutocompleteSuggetionsComponent', () => {
  let component: AutocompleteSuggetionsComponent;
  let fixture: ComponentFixture<AutocompleteSuggetionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteSuggetionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteSuggetionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
