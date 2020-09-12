import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { StaffAlertService } from '../staff-alert';
import { Chore } from '@my-tray/api-interfaces';
import { ConfigurationService } from '@my-tray/shared/backend';

@Injectable()
export class MaintanenceService {

  constructor(
    private staffAlert: StaffAlertService,
    private configService: ConfigurationService
  ) { }

  doChore(chore: Chore) {
    const q = new Parse.Query('Maintenance');
    q.equalTo('chores', chore);
    q.find({ sessionToken: this.configService.user.getSessionToken() })
      .then(workers => {
        workers.map(w => {
          this.staffAlert.alertStaff(w.get('phone'), chore);
        })
      });
  }
}
