import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralAdComponent } from './referral-ad.component';

describe('ReferralAdComponent', () => {
  let component: ReferralAdComponent;
  let fixture: ComponentFixture<ReferralAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
