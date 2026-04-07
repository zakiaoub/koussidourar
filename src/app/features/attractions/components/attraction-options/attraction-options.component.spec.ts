import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionOptionsComponent } from './attraction-options.component';

describe('AttractionOptionsComponent', () => {
  let component: AttractionOptionsComponent;
  let fixture: ComponentFixture<AttractionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
