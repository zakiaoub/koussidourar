import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCompanyComponent } from './skeleton-company.component';

describe('SkeletonCompanyComponent', () => {
  let component: SkeletonCompanyComponent;
  let fixture: ComponentFixture<SkeletonCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
