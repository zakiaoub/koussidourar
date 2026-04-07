import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesLevelsComponent } from './affiliates-levels.component';

describe('AffiliatesLevelsComponent', () => {
  let component: AffiliatesLevelsComponent;
  let fixture: ComponentFixture<AffiliatesLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliatesLevelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatesLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
