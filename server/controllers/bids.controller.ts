import { ethers } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";
import { Request, Response } from "express";
import DataStorage from "../data-storage/data-storage";
import { ERC721__factory } from "../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory";

async function approveBid(req: Request, res: Response) {
  const { approvedSignature } = req.body;
  // get Bid data
  const Bids = DataStorage.getCollection("Bids");
  const bid = Bids.getById(req.params.id);

  // check if approval signer is owner of token
  if (
    !isLegitOwner(
      {
        collectionAddress: bid.collectionAddress,
        tokenId: bid.tokenId,
        bidderSignature: bid.bidderSignature,
        signature: approvedSignature,
      },
      req.locals.web3Provider
    )
  )
    res.status(403).json({ message: "Signer is not the owner of NFT" });

  // store approvedSignature with bid data
  bid.approvedSignature = approvedSignature;
  const result = Bids.set(bid);

  res.status(201).json(result);
}

async function create(req: Request, res: Response) {
  const {
    collectionAddress,
    erc20Address,
    tokenId,
    bid,
    bidderSignature,
    ownerAddress,
  } = req.body;

  if (
    !(collectionAddress &&
      erc20Address &&
      tokenId >= 0 &&
      bid &&
      bidderSignature)
  )
    res.status(400).json({ message: "Request is malformed" });

  // check that an auction exists
  const Auctions = DataStorage.getCollection("Auctions");
  const auction = Auctions.get({ collectionAddress, tokenId });
  if (!auction) res.status(404).json({ message: "Auction not found" });
  
  // check that bid placed is greater than floor price
  if (ethers.BigNumber.from(auction.floorPrice).gt(bid))
    res.status(400)
       .json({ message: "Your bid must be higher than floor price" });

  const messageHash = ethers.utils.solidityKeccak256(
    ["address", "address", "uint256", "uint256"],
    [collectionAddress, erc20Address, tokenId, bid]
  );
  const bidderAddress = await ethers.utils.verifyMessage(
    ethers.utils.arrayify(messageHash),
    bidderSignature
  );

  const Bids = DataStorage.getCollection("Bids");
  // store auction._id as a shortcut for deletion 
  // of auction when the proper auction is finished in the marketplace
  const result = Bids.set({
    collectionAddress,
    tokenId,
    bid,
    bidderSignature,
    bidderAddress,
    ownerAddress,
    auctionId: auction._id,
  });

  res.status(201).json(result);
}

function list(req: Request, res: Response) {
  // this of course needs to be validated, sanitized and secured in a real enviroment
  // query should also be paged
  const Bids = DataStorage.getCollection("Bids");
  const result = Bids.getAll(req.query);
  res.status(200).json(result);
}

function read(req: Request, res: Response) {
  const { id } = req.params;
  const Bids = DataStorage.getCollection("Bids");
  const result = Bids.getById(id);
  res.status(200).json(result);
}

async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const Bids = DataStorage.getCollection("Bids");
  const bid = Bids.getById(id);
  if (!bid) res.status(404).json({ message: "Bid not found" });

  // only owner of bid can delete it if a proper signature is sent
  let recoveredAddress;
  if (req.body.signature) {
    const messageHash = ethers.utils.solidityKeccak256(["string"], [id]);
    recoveredAddress = await ethers.utils.verifyMessage(
      ethers.utils.arrayify(messageHash),
      <SignatureLike>req.body.signature
    );
    if(bid.bidderAddress !== recoveredAddress)
      return res.status(403)
                .json({ message: "Signer is not the owner of the bid "})
  }

  // marketplace should have an authorization token to send when an auction is completed
  // this is ommited here as this is only a demo, but should be implemented
  Bids.clear(id);
  res.status(204).json();
}

async function isLegitOwner(
  { collectionAddress, tokenId, bidderSignature, signature },
  provider
) {
  // an error in this function could break express-async-error
  try {
    const mockERC721 = await ERC721__factory.connect(
      collectionAddress,
      provider
    );

    const messageHash = ethers.utils.solidityKeccak256(
      ["bytes"],
      [bidderSignature]
    );

    const owner = await mockERC721.ownerOf(tokenId);

    const recoveredAddress = await ethers.utils.verifyMessage(
      ethers.utils.arrayify(messageHash),
      signature
    );

    return owner === recoveredAddress;
  } catch (e) {
    // error should be passed to a logging service
    return false;
  }
}

export default { create, approveBid, list, read, remove };
