import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsLinkComponent } from './referrals-link.component';

describe('ReferralsLinkComponent', () => {
  let component: ReferralsLinkComponent;
  let fixture: ComponentFixture<ReferralsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
