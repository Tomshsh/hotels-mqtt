import { Injectable } from '@nestjs/common';
import { Channel, connect } from 'amqplib/callback_api'

@Injectable()
export class RmqService {

  constructor() { }

  channel: Channel;

  createConnection(env) {
    connect(env.rmq.url, (err, connection) => {
      if (err) throw err

      connection.createChannel((err, channel) => {
        if (err) throw err
        this.channel = channel
      })
    })
  }

  publishToDefaultQueue(action, msg, exchange) {
    // this.channel.assertExchange(exchange, 'direct', { durable: true })
    // this.channel.publish(exchange, action, Buffer.from([msg]), {
    //   contentType:'application/JSON',
    //   persistent: true
    // })

    this.channel.assertQueue(action, { durable: true })
    this.channel.sendToQueue(
      action,
      Buffer.from(JSON.stringify(msg)),
      {
        persistent: true,
        contentType: 'application/JSON'
      })
  }

}
