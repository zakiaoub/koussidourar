import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsResultsComponent } from './attractions-results.component';

describe('AttractionsResultsComponent', () => {
  let component: AttractionsResultsComponent;
  let fixture: ComponentFixture<AttractionsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
