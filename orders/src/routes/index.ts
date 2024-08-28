import { requireAuth } from '@sahhhalltickets/common';
import express, {Request, Response} from 'express';
import { Order } from '../models/order';


const router = express.Router();


//retriveing all active orders for the given user making the request
router.get('/api/orders', requireAuth,async(req: Request, res: Response)=> {
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket');

    res.send(orders)
})


export { router as indexOrderRouter }