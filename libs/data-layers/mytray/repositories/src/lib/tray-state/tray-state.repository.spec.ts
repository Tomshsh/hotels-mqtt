import { TestBed } from '@angular/core/testing';
import { TrayStateRepository } from './tray-state.repository';
import { TrayStateEntity } from '@my-tray/api-interfaces/entities';

const MockedArrayOfTrayStates: TrayStateEntity[] = [
]
describe('TrayStateRepository', () => {
  let service: TrayStateRepository<TrayStateEntity>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayStateRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll() statuses from database', async () => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve(MockedArrayOfTrayStates));
    service.getAll().then((entities) => {
      expect(entities).not.toBeNull();
    });
  });
});
