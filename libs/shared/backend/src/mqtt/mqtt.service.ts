import { Injectable } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt'

@Injectable()
export class MqttService {

  client: MqttClient;

  constructor() {}

  connect(env) {
    const { host, username, password, ca, main } = env.mqtt
    this.client = connect(host, { username, password, ca })

  }

}
