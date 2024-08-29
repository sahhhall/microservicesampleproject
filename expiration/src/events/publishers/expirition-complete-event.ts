import { Subjects ,Publisher, ExpirationCompleteEvent} from "@sahhhalltickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete= Subjects.ExpirationComplete;
}