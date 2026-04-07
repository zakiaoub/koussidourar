import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInprogressComponent } from './account-inprogress.component';

describe('AccountInprogressComponent', () => {
  let component: AccountInprogressComponent;
  let fixture: ComponentFixture<AccountInprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInprogressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
