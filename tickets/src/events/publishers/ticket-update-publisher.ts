import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
  } from "@sahhhalltickets/common";
  
  export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  }
  