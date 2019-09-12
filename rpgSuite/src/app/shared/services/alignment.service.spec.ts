import { TestBed } from '@angular/core/testing';

import { AlignmentService } from './alignment.service';

describe('AlignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlignmentService = TestBed.get(AlignmentService);
    expect(service).toBeTruthy();
  });
});
