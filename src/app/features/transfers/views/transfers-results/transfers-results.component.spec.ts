import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersResultsComponent } from './transfers-results.component';

describe('TransfersResultsComponent', () => {
  let component: TransfersResultsComponent;
  let fixture: ComponentFixture<TransfersResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
