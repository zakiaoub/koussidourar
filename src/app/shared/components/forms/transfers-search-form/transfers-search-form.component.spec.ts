import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersSearchFormComponent } from './transfers-search-form.component';

describe('TransfersSearchFormComponent', () => {
  let component: TransfersSearchFormComponent;
  let fixture: ComponentFixture<TransfersSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
