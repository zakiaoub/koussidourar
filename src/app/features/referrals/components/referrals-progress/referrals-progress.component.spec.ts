import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsProgressComponent } from './referrals-progress.component';

describe('ReferralsProgressComponent', () => {
  let component: ReferralsProgressComponent;
  let fixture: ComponentFixture<ReferralsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
