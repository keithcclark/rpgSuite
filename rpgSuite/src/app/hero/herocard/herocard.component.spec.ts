import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerocardComponent } from './herocard.component';

describe('HerocardComponent', () => {
  let component: HerocardComponent;
  let fixture: ComponentFixture<HerocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
