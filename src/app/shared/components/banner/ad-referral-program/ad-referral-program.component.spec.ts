import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdReferralProgramComponent } from './ad-referral-program.component';

describe('AdReferralProgramComponent', () => {
  let component: AdReferralProgramComponent;
  let fixture: ComponentFixture<AdReferralProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdReferralProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdReferralProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
