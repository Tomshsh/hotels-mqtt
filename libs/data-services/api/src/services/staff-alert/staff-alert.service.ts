import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '@my-tray/shared/backend';


@Injectable()
export class StaffAlertService {

  private fromNumber: string = '+13157374243';

  constructor(private configService: ConfigurationService){

  }

  alertStaff(number: string, body){
    this.configService.twilio.messages
    .create({
      body: body,
      from: this.fromNumber,
      to: number
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err))
  }

}
