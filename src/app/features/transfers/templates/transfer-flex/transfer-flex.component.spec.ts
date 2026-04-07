import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFlexComponent } from './transfer-flex.component';

describe('TransferFlexComponent', () => {
  let component: TransferFlexComponent;
  let fixture: ComponentFixture<TransferFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferFlexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
