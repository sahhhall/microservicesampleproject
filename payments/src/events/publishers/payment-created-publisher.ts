import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@sahhhalltickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
