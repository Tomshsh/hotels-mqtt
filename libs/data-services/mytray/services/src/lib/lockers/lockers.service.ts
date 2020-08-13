import { Injectable } from '@angular/core';
import { LockersRepo } from '@my-tray/data-layers/mytray/repositories';
import { LockerDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockersService {

  constructor(private lockersRepo: LockersRepo) { }

  getLockers(): Observable<LockerDto[]>{
    return fromPromise(
      this.lockersRepo.getLockers()
    )
  }

  update(locker: LockerDto): Observable<LockerDto>{
    return fromPromise(this.lockersRepo.update(locker))
  }

  createLocker(locker: LockerDto):Observable<LockerDto>{
    return fromPromise(this.lockersRepo.createLocker(locker))
  }

  delete(lockerId: string): Observable<void>{
    return fromPromise(this.lockersRepo.delete(lockerId, 'Locker'))
  }

}
