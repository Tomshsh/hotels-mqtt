import { Injectable } from '@angular/core';
import {TowelsRepository} from '@my-tray/data-layers/mytray/repositories'
import { RoomTowelsDto } from '@my-tray/api-interfaces';

@Injectable({providedIn:'root'})
export class TowelsService{

  constructor(private towelsRepo: TowelsRepository){}

  async saveTowels(roomTowelsObj: RoomTowelsDto){
    try{
      const roomTowels = await this.towelsRepo.saveTowels(roomTowelsObj)
      return roomTowels
    }catch (err){
      throw new Error(err)
    }
  }

}