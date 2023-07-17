import { TestBed } from '@angular/core/testing';

import { MovieNotesService } from './movie-notes.service';

describe('MovieNotesService', () => {
  let service: MovieNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
