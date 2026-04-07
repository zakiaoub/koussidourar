import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsResultsComponent } from './hotels-results.component';

describe('HotelsResultsComponent', () => {
  let component: HotelsResultsComponent;
  let fixture: ComponentFixture<HotelsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
