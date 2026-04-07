import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralLinkFormComponent } from './referral-link-form.component';

describe('ReferralLinkFormComponent', () => {
  let component: ReferralLinkFormComponent;
  let fixture: ComponentFixture<ReferralLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralLinkFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
