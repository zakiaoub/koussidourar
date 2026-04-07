import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimensionFilterComponent } from './two-dimension-filter.component';

describe('TwoDimensionFilterComponent', () => {
  let component: TwoDimensionFilterComponent;
  let fixture: ComponentFixture<TwoDimensionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoDimensionFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDimensionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
