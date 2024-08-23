import express, { Request, Response } from "express";
import { curentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();


router.get("/api/users/currentuser",curentUser, requireAuth , async (req: Request, res: Response) => {
  res.send({curentUser: req.currentUser || null})
});

export { router as currentUserRouter };
