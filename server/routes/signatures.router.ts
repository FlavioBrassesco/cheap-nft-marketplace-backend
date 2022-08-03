import express from "express";
const router = express.Router();
import signaturesController from "../controllers/signatures.controller";

router.route("/signatures").get(signaturesController.list);
router.route("/signatures/:collectionAddress").get(signaturesController.list);
router.route("/signatures/:collectionAddress/:tokenId").get(signaturesController.list);

export default router;
