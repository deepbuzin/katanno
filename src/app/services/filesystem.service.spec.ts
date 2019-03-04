import { TestBed, inject } from '@angular/core/testing';

import { FilesystemService } from './fs.service';

describe('FilesystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesystemService]
    });
  });

  it('should ...', inject([FilesystemService], (service: FilesystemService) => {
    expect(service).toBeTruthy();
  }));
});
