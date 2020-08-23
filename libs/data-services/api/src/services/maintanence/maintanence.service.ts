import { Injectable } from '@nestjs/common';
import Parse from 'parse'
import { StaffAlertService } from '../staff-alert';

@Injectable()
export class MaintanenceService {

  constructor(
    private staffAlert: StaffAlertService
  ){}

  doChore(chore: string){
    const q = new Parse.Query('Maintenance')
    q.equalTo('chores', chore)
    q.equalTo('onShift', true)
    q.first()
    .then(worker => {
      this.staffAlert.alertStaff(worker.get('phone'), chore)
    })
  }
}
