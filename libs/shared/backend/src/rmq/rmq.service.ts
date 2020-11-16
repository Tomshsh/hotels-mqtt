import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfirmChannel, connect, Connection } from 'amqplib/callback_api'

@Injectable()
export class RmqService {

  constructor(private configService: ConfigService) { }

  private pubChannel: ConfirmChannel;
  private amqpConn: Connection;
  private offlinePubQueue = [];

  start() {
    connect(this.configService.get('rmq').url, (err, conn) => {
      if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(this.start.bind(this), 1000);
      }
      conn.on("error", (err) => {
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });
      conn.once("close", () => {
        console.error("[AMQP] reconnecting");
        return setTimeout(this.start.bind(this), 1000);
      });
      console.log("[AMQP] connected");
      this.amqpConn = conn;
      this.startPublisher()
    });
  }

  startPublisher() {
    this.amqpConn.createConfirmChannel((err, ch) => {
      if (this.closeOnErr(err)) return;
      ch.on("error", (err) => {
        console.error("[AMQP] channel error", err.message);
      });
      ch.on("close", () => {
        console.log("[AMQP] channel closed");
      });

      this.pubChannel = ch;
      while (true) {
        var m = this.offlinePubQueue.shift();
        if (!m) break;
        this.publish(m[0], m[1], m[2]);
      }
    });
  }

  publish(exchange: 'towel_billing' | 'minibar_billing', routingKey, content) {
    try {
      this.pubChannel.publish(exchange, routingKey, Buffer.from(JSON.stringify(content)), { persistent: true },
        (err, ok) => {
          if (err) {
            console.error("[AMQP] publish", err);
            this.offlinePubQueue.push([exchange, routingKey, content]);
            this.amqpConn.close();
          }
        });
    } catch (e) {
      console.error("[AMQP] publish", e.message);
      this.offlinePubQueue.push([exchange, routingKey, content]);
    }
  }

  closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    this.amqpConn.close();
    return true;
  }


}