import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsHomeComponent } from './referrals-home.component';

describe('ReferralsHomeComponent', () => {
  let component: ReferralsHomeComponent;
  let fixture: ComponentFixture<ReferralsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
