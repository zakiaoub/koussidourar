import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsSearchFormComponent } from './attractions-search-form.component';

describe('AttractionsSearchFormComponent', () => {
  let component: AttractionsSearchFormComponent;
  let fixture: ComponentFixture<AttractionsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
