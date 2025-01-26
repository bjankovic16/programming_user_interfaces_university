import { TestBed } from '@angular/core/testing';

import { RobaService } from './roba.service';

describe('RobaService', () => {
  let service: RobaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
