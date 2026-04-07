import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonRoomsComponent } from './skeleton-rooms.component';

describe('SkeletonRoomsComponent', () => {
  let component: SkeletonRoomsComponent;
  let fixture: ComponentFixture<SkeletonRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
