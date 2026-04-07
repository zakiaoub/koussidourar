import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfilComponent } from './account-profil.component';

describe('AccountProfilComponent', () => {
  let component: AccountProfilComponent;
  let fixture: ComponentFixture<AccountProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
