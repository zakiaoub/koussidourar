import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersOverviewComponent } from './transfers-overview.component';

describe('TransfersOverviewComponent', () => {
  let component: TransfersOverviewComponent;
  let fixture: ComponentFixture<TransfersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
