import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdServiceAddComponent } from './ad-service-add.component';

describe('AdServiceAddComponent', () => {
  let component: AdServiceAddComponent;
  let fixture: ComponentFixture<AdServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdServiceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
