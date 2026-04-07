import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContentAttractionComponent } from './booking-content-attraction.component';

describe('BookingContentAttractionComponent', () => {
  let component: BookingContentAttractionComponent;
  let fixture: ComponentFixture<BookingContentAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContentAttractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingContentAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
