import { Injectable } from '@angular/core';
import Parse from 'parse'
import { MaintenanceDto } from '@my-tray/api-interfaces';
import { Repository } from '../repository';

@Injectable({
  providedIn: 'root'
})

export class MaintenanceRepo extends Repository<MaintenanceDto>{

  constructor() {
    super();
  }

  private parseObjToDto(obj: Parse.Object): MaintenanceDto {
    return {
      id: obj.id,
      name: obj.get('name'),
      onShift: obj.get('onShift'),
      chores: obj.get('chores')
    };
  }

  getWorkers(): Promise<MaintenanceDto[]> {
    const q = new Parse.Query('Maintenance');
    return q.find()
      .then(workers => workers.map(this.parseObjToDto));
  }

  addWorker(worker: MaintenanceDto): Promise<MaintenanceDto> {
    const maintenance = new Parse.Object('Maintenance');
    return maintenance.save(worker)
      .then(this.parseObjToDto);
  }

  updateWorker(worker: MaintenanceDto): Promise<MaintenanceDto> {
    const q = new Parse.Query('Maintenance');
    return q.get(worker.id)
      .then(maint => maint.save(worker))
      .then(this.parseObjToDto);
  }
}