import { TestBed } from '@angular/core/testing';

import { TemplatesDataService } from './templates-data.service';
import { TemplatesDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('TemplatesDataService', () => {
  let service: TemplatesDataService;

  beforeEach(() => {
    const mockEnv =
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: TemplatesDataRepository, useValue: {} },
          { provide: AuthSessionQuery, useValue: {} },
          { provide: HttpClient, useValue: {} },
          { provide: 'env', useValue: environment }
        ]
      });
    service = TestBed.inject(TemplatesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
