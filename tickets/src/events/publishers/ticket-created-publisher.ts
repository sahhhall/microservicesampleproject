import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@sahhhalltickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
