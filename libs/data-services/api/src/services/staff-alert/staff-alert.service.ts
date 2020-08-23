import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '@my-tray/shared/backend';


@Injectable()
export class StaffAlertService {

  fromNumber: string = '+13157374243';

  constructor(private configService: ConfigurationService){

  }

  alertStaff(number: string){
    this.configService.twilio.messages
    .create({
      body:'refill towels at lockers xy',
      from: this.fromNumber,
      to: number
    })
    .then(msg => console.log(msg))
  }

}
