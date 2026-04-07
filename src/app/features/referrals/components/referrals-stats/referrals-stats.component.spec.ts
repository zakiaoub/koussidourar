import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsStatsComponent } from './referrals-stats.component';

describe('ReferralsStatsComponent', () => {
  let component: ReferralsStatsComponent;
  let fixture: ComponentFixture<ReferralsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
