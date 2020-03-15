import { async, TestBed } from '@angular/core/testing';
import { DataLayersMyTrayRepositoriesModule } from './data-layers-mytray-repositories.module';

describe('DataLayersMyTrayRepositoriesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataLayersMyTrayRepositoriesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataLayersMyTrayRepositoriesModule).toBeDefined();
  });
});
