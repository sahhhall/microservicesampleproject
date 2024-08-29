import {
  Listner,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@sahhhalltickets/common";

import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { Ticket } from "../../models/ticket";

export class ExpirationCompleteListener extends Listner<ExpirationCompleteEvent> {
  queueGroupName: string = queueGroupName;
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("order not found");
    }
    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();
    // we have to publish event that order has cancelled
    console.log("------am here to check is all work ----- expiation complete after 1 minute")
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
  }
}
