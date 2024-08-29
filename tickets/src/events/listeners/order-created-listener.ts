import { Listner, OrderCreatedEvent, Subjects } from "@sahhhalltickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";

export class OrderCreatedListener extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // find the ticket that the order is reciveing
    const ticket = await Ticket.findById(data.ticket.id);
    // if not tikcet throw err
    if (!ticket) {
      throw new Error("ticket not found");
    }
    // mark the ticket has been reserved

    ticket.set({ orderId: data.id });
    //save the ticket

    // we have allow to replacited ticket database to sync
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //acknolwgment the ticket
    msg.ack();
  }
}
