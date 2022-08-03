import express from "express";
const router = express.Router();
import bidsController from "../controllers/bids.controller";

router.route("/bids")
  .get(bidsController.list)
  .post(bidsController.create);

router
  .route("/bids/:id")
  .get(bidsController.read)
  .post(bidsController.approveBid);

export default router;
