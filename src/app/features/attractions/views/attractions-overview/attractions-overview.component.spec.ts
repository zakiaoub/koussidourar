import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsOverviewComponent } from './attractions-overview.component';

describe('AttractionsOverviewComponent', () => {
  let component: AttractionsOverviewComponent;
  let fixture: ComponentFixture<AttractionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
