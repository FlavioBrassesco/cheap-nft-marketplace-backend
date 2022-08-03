/// <reference path="../types/index.d.ts" />
import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import notFound from "./middlewares/not-found";
import errorHandler from "./middlewares/error-handler";
import ethersProvider from "./middlewares/ethers-provider";

import DataStorage from "./data-storage/data-storage";
import AuctionCollection from "./data-storage/auction.collection";
import BidCollection from "./data-storage/bid.collection";

import auctionsRouter from "./routes/auctions.router";
import bidsRouter from "./routes/bids.router";
import signaturesRouter from "./routes/signatures.router";

// express config
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

DataStorage.setApp(app);
DataStorage.addCollection("Auctions", AuctionCollection);
DataStorage.addCollection("Bids", BidCollection);

app.use((req, res, next) => {
  req.locals = {};
  next();
});

// ethers provider middleware
app.use(ethersProvider);

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "server up and running" });
});

app.use("/api/", auctionsRouter);
app.use("/api/", bidsRouter);
app.use("/api/", signaturesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
