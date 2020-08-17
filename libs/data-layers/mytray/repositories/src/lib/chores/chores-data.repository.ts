import { Injectable } from '@angular/core';
import Parse from 'parse';
import { ChoreDto } from '@my-tray/api-interfaces';
import { Repository } from '../repository';

@Injectable({ providedIn: 'root' })
export class ChoresRepo extends Repository<ChoreDto>{

  constructor() {
    super();
  }

  private parseObjToDto(obj: Parse.Object<Parse.Attributes>): ChoreDto {
    return {
      id: obj.id,
      updatedAt: obj.updatedAt,
      title: obj.get('name'),
      abbr: obj.get('name'),
    };
  }

  getChores(): Promise<ChoreDto[]> {
    const q = new Parse.Query('Chore');
    return q.find()
      .then(chores => chores.map(this.parseObjToDto));
  }

  updateChore(chore: ChoreDto): Promise<ChoreDto> {
    const q = new Parse.Query('Chore');
    return q.get(chore.id)
      .then(obj => obj.save({
        name: chore.title,
      }))
      .then(this.parseObjToDto);
  }

  addChore(chore: ChoreDto): Promise<ChoreDto> {
    const obj = new Parse.Object("Chore");
    return obj.save({
      name: chore.title
    })
    .then(obj =>{
      console.log(obj);
      return this.parseObjToDto(obj);
    });
  }

}