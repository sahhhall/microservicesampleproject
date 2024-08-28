import {
    Publisher,
    OrderCancelledEvent,
    Subjects,
  } from "@sahhhalltickets/common";
  
  export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  }
  