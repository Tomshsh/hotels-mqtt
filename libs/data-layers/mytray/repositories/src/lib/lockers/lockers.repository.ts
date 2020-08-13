import { Repository } from '../repository';
import { Injectable } from '@angular/core';
import { LockerDto } from '@my-tray/api-interfaces';
import Parse from 'parse'


@Injectable({providedIn: 'root'})
export class LockersRepo extends Repository<LockerDto>{

  constructor(){
    super();
  }

  private parseObjToDto(obj: Parse.Object): LockerDto{
    return{
      id: obj.id,
      capacity: obj.get('capacity'),
      quantity: obj.get('quantity'),
      open: obj.get('open')
    }
  }

  getLockers(): Promise<LockerDto[]>{
    const q = new Parse.Query('Locker')
    return q.find()
    .then(lockers => lockers.map(this.parseObjToDto))
  }

  update(locker: LockerDto): Promise<LockerDto>{
    const q = new Parse.Query('Locker')
    return q.get(locker.id)
    .then(l => l.save(locker))
    .then(this.parseObjToDto)
  }

  createLocker(locker: LockerDto):Promise<LockerDto>{
    const newLocker = new Parse.Object('Locker')
    return newLocker.save(locker)
    .then(this.parseObjToDto)
  }
}