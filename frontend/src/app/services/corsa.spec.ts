import { TestBed } from '@angular/core/testing';

import { Corsa } from './corsa';

describe('Corsa', () => {
  let service: Corsa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Corsa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
