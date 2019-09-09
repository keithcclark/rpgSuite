import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionCardComponent } from './reaction-card.component';

describe('ReactionCardComponent', () => {
  let component: ReactionCardComponent;
  let fixture: ComponentFixture<ReactionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
