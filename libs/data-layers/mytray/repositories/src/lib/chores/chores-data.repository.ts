import { Injectable } from '@angular/core';
import Parse from 'parse';
import { ChoreDto } from '@my-tray/api-interfaces';

@Injectable({providedIn: 'root'})
export class ChoresRepo{

  constructor(){}

  private parseObjToDto(obj: Parse.Object<Parse.Attributes>): ChoreDto{
    return {
      id: obj.id,
      updatedAt: obj.updatedAt,
      assignee: obj.get('assignee')?.name,
      title: obj.get('name'),
      abbr: obj.get('name'),
    }
  }

  getChores(): Promise<ChoreDto[]>{
    console.log('get')
    const q = new Parse.Query('Chore')
    return q.find()
    .then( chores => chores.map(this.parseObjToDto))
  }

}