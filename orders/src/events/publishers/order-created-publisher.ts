import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@sahhhalltickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
