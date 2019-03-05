import { TestBed, inject } from '@angular/core/testing';

import { FsService } from './fs.service';

describe('FilesystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsService]
    });
  });

  it('should ...', inject([FsService], (service: FsService) => {
    expect(service).toBeTruthy();
  }));
});
