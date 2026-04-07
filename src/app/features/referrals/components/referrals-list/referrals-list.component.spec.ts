import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsListComponent } from './referrals-list.component';

describe('ReferralsListComponent', () => {
  let component: ReferralsListComponent;
  let fixture: ComponentFixture<ReferralsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
