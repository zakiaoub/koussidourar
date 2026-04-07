import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttractionCardComponent } from './attraction-card.component';

describe('CardAttractionComponent', () => {
  let component: AttractionCardComponent;
  let fixture: ComponentFixture<AttractionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
