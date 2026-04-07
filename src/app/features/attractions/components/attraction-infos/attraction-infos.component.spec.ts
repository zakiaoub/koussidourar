import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionInfosComponent } from './attraction-infos.component';

describe('AttractionInfosComponent', () => {
  let component: AttractionInfosComponent;
  let fixture: ComponentFixture<AttractionInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
