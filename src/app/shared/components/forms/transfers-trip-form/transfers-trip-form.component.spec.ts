import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersTripFormComponent } from './transfers-trip-form.component';

describe('TransfersTripFormComponent', () => {
  let component: TransfersTripFormComponent;
  let fixture: ComponentFixture<TransfersTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersTripFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
