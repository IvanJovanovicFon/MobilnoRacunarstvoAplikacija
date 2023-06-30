import { TestBed } from '@angular/core/testing';

import { HideMenuService } from './hide-menu.service';

describe('HideMenuService', () => {
  let service: HideMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
