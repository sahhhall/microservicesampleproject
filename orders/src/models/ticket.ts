import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@sahhhalltickets/common";

interface TicketAtts {
  title: string;
  price: number;
}

//each document
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isResreved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAtts): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// its fro ticket modal ovarall collecin
ticketSchema.statics.build = (attrs: TicketAtts) => {
  return new Ticket(attrs);
};

//each document
// here becuase of normal functionwe need get context of where it call
ticketSchema.methods.isResreved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
        OrderStatus.Created,
      ],
    },
  });
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
