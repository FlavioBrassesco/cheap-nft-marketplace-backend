import express from "express";
const router = express.Router();
import auctionsController from "../controllers/auctions.controller";

router
  .route("/auctions")
  .get(auctionsController.list)
  .post(auctionsController.create);

router
  .route("/auctions/:id")
  .get(auctionsController.read)
  .delete(auctionsController.remove);

export default router;
