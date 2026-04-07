import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsMeetingComponent } from './attractions-meeting.component';

describe('AttractionsMeetingComponent', () => {
  let component: AttractionsMeetingComponent;
  let fixture: ComponentFixture<AttractionsMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
