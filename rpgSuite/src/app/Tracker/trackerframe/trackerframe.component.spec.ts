import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerframeComponent } from './trackerframe.component';

describe('TrackerframeComponent', () => {
  let component: TrackerframeComponent;
  let fixture: ComponentFixture<TrackerframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
