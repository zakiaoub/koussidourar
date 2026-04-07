import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionOthersComponent } from './attraction-others.component';

describe('AttractionOthersComponent', () => {
  let component: AttractionOthersComponent;
  let fixture: ComponentFixture<AttractionOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
