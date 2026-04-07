import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsDetailsComponent } from './attractions-details.component';

describe('AttractionsDetailsComponent', () => {
  let component: AttractionsDetailsComponent;
  let fixture: ComponentFixture<AttractionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
