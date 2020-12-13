import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { StaffAlertService } from '../staff-alert';
import { Chore } from '@my-tray/api-interfaces';
import { ConfigurationService } from '@my-tray/shared/backend';

@Injectable()
export class HousekeepingService {

  constructor(
    private staffAlert: StaffAlertService,
    private configService: ConfigurationService
  ) { }

  doChore(chore: Chore) {
    const q = new Parse.Query('Housekeeping');
    q.equalTo('chores', chore);
    q.find({ sessionToken: this.configService.user.getSessionToken() })
      .then(workers => {
        workers.map(w => {
          this.staffAlert.alertStaff(w.get('phone'), chore, (err, twilioMsg) => {
            if (err) console.error("Error: couldn't send message to worker", w.get('name'))
          })
        })
      });
  }
}
