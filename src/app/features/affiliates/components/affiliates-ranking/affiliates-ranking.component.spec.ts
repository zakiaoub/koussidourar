import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesRankingComponent } from './affiliates-ranking.component';

describe('AffiliatesRankingComponent', () => {
  let component: AffiliatesRankingComponent;
  let fixture: ComponentFixture<AffiliatesRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliatesRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatesRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
