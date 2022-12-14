/// <reference path="../../types/index.d.ts" />
import config from "../config/config";
import { ethers } from "ethers";
import { Request, Response } from "express";

const ethersProvider = (req: Request, res: Response, next) => {
  req.locals.web3Provider = new ethers.providers.AlchemyProvider(
    "goerli",
    config.alchemyApiKey
  );
  next();
};

export default ethersProvider;
