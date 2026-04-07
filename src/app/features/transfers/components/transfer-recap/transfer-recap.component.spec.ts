import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecapComponent } from './transfer-recap.component';

describe('TransferRecapComponent', () => {
  let component: TransferRecapComponent;
  let fixture: ComponentFixture<TransferRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
