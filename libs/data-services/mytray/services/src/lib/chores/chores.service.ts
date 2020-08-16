import { Injectable } from '@angular/core';
import { ChoresRepo } from '@my-tray/data-layers/mytray/repositories';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { ChoreDto } from '@my-tray/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChoresService {

  constructor(private choresRepo: ChoresRepo) { }

  getChores(): Observable<ChoreDto[]>{
    return fromPromise(this.choresRepo.getChores())
  }
}
