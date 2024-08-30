import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@sahhhalltickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== (req.currentUser?.id as any)) {
      throw new NotAuthorizedError("go on checkc you order mf");
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay expired or cancelled order");
    }
    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price,
      source: token,
    });

    const payment = await Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
