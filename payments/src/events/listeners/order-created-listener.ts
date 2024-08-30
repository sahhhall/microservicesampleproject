import {
  Listner,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@sahhhalltickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { version } from "mongoose";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order  = Order.build({
        id:data.id,
        price: data.ticket.price,
        status: data.status,
        userId: data.userId,
        version: data.version
    });

    await order.save();
    msg.ack();
  }
}
