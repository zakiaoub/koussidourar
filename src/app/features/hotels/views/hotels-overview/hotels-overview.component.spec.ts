import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsOverviewComponent } from './hotels-overview.component';

describe('HotelsOverviewComponent', () => {
  let component: HotelsOverviewComponent;
  let fixture: ComponentFixture<HotelsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
