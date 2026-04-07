import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFlexComponent } from './flex-hotel.component';

describe('FlexHotelComponent', () => {
  let component: HotelFlexComponent;
  let fixture: ComponentFixture<HotelFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFlexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
