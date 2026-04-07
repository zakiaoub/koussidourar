import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckGroupSegmentComponent } from './check-group-segment.component';

describe('CheckGroupSegmentComponent', () => {
  let component: CheckGroupSegmentComponent;
  let fixture: ComponentFixture<CheckGroupSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckGroupSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckGroupSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
