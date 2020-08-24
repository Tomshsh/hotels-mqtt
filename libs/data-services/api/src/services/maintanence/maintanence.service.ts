import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { StaffAlertService } from '../staff-alert';
import { Chore } from '@my-tray/api-interfaces';

@Injectable()
export class MaintanenceService {

  constructor(
    private staffAlert: StaffAlertService
  ){}

  doChore(chore: Chore){
    const q = new Parse.Query('Maintenance');
    q.equalTo('chores', chore);
    q.equalTo('onShift', true);
    q.first()
    .then(worker => {
      console.log(worker)
      this.staffAlert.alertStaff(worker.get('phone'), chore);
    });
  }
}
