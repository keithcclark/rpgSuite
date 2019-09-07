import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCardComponent } from './tracker-card.component';

describe('TrackerCardComponent', () => {
  let component: TrackerCardComponent;
  let fixture: ComponentFixture<TrackerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
