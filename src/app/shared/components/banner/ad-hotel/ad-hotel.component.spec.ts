import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHotelComponent } from './ad-hotel.component';

describe('AdHotelComponent', () => {
  let component: AdHotelComponent;
  let fixture: ComponentFixture<AdHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
