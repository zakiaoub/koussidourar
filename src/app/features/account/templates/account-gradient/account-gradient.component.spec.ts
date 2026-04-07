import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGradientComponent } from './account-gradient.component';

describe('AccountGradientComponent', () => {
  let component: AccountGradientComponent;
  let fixture: ComponentFixture<AccountGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountGradientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
