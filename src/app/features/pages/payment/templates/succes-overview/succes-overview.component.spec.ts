import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesOverviewComponent } from './succes-overview.component';

describe('SuccesOverviewComponent', () => {
  let component: SuccesOverviewComponent;
  let fixture: ComponentFixture<SuccesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
