import { async, TestBed } from '@angular/core/testing';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatabaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DatabaseModule).toBeDefined();
  });
});
