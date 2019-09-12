import { TestBed } from '@angular/core/testing';

import { ConditonService } from './conditon.service';

describe('ConditonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConditonService = TestBed.get(ConditonService);
    expect(service).toBeTruthy();
  });
});
