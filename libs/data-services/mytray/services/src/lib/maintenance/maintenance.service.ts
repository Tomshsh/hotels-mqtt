import { Injectable } from '@angular/core';
import { MaintenanceRepo } from '@my-tray/data-layers/mytray/repositories';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { MaintenanceDto } from '@my-tray/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private maintRepo: MaintenanceRepo) { }

  getWorkers():Observable<MaintenanceDto[]> {
    return fromPromise(this.maintRepo.getWorkers());
  }

  addWorker(obj: MaintenanceDto){
    return fromPromise(this.maintRepo.addWorker(obj));
  }

  updateWorker(obj: MaintenanceDto){
    return fromPromise(this.maintRepo.updateWorker(obj));
  }

  deleteWorker(objId: string){
    return fromPromise(this.maintRepo.delete(objId, 'Maintenance'));
  }
}
