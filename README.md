# MQTT NestJs Microservice

a microservice for tracking hotel guest transactions, used for integration in an environment of mqtt clients/devices.

[this flow chart](https://drive.google.com/file/d/1L-hOiWROy5YEKuuM7u_TAsaSyjVqQcrI/view?usp=sharing) describes the design for the whole project

in app.controller.js you will see: 
````
@MessagePattern(`+/+/item/get`)
  async returnProducts(@Payload() { itemQty, cardId, itemType, roomId }, @Ctx() context: MqttContext) {
     const [hotelId, deviceId] = context.getTopic().split('/')
  .
  .
  }
````

- `@MessagePattern` is a decorator which subscribes to a topic passed as a string parameter.
- `@Payload` catches and parses the JSON message sent from the topic.
- `@Ctx` contains the string topic. "+" in the topic is a single level wildcard, 
which means that the first two levels are dynamic and vary for every request.

the above snippet of code will handle a message such as this:
````
{
   "cardId":"12345677"      // guests keycard
   "itemQty": 2             // quantity of items taken
   "itemType": "SNICKERS"   // which item
}
````

### Flow

![Screenshot from 2021-07-21 17-39-50](https://user-images.githubusercontent.com/53683817/126508007-2c5b7ec7-1345-41ed-ab08-82a0a57821a4.png)

### Sequence Diagram

![Screenshot from 2021-07-21 17-40-08](https://user-images.githubusercontent.com/53683817/126508469-89133759-202a-4bb8-9c47-c46717fbc3ed.png)





