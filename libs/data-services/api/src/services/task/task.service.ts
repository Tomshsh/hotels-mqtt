import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {

  constructor(){}

  @Interval('lockerContactInterval', 360000)
  handleInterval(){
    console.log('perform check')
  }
}
