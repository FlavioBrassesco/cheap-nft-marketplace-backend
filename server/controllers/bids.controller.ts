import { ethers } from "ethers";
import { Request, Response } from "express";
import DataStorage from "../data-storage/data-storage";
import { ERC721__factory } from "../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory";

function list(req: Request, res: Response) {
  const Bids = DataStorage.getCollection("Bids");
  // this of course needs to be validated, sanitized and secured in a real enviroment
  // query should also be paged
  const result = Bids.getAll(req.query);
  res.status(200).json(result);
}

function read(req: Request, res: Response) {
  const { id } = req.params;
  const Bids = DataStorage.getCollection("Bids");
  const result = Bids.getById(id);
  res.status(200).json(result);
}

async function create(req: Request, res: Response) {
  const { collectionAddress, tokenId, bid, signature } = req.body;
  if (
    !(collectionAddress && tokenId >= 0 && bid && signature)
  )
    res.status(400).json({ message: "Request is malformed" });

  // check that an auction exists
  const Auctions = DataStorage.getCollection("Auctions");
  const auction = Auctions.get({ collectionAddress, tokenId });
  if (!auction) res.status(404).json({ message: "Auction not found" });
  if (ethers.BigNumber.from(auction.floorPrice).gt(bid))
    res
      .status(400)
      .json({ message: "Your bid must be higher than floor price" });

  const messageHash = ethers.utils.solidityKeccak256(
    ["address", "uint256", "uint256"],
    [collectionAddress, tokenId, bid]
  );
  const signerAddress = await ethers.utils.verifyMessage(
    ethers.utils.arrayify(messageHash),
    signature
  );

  const Bids = DataStorage.getCollection("Bids");
  const result = Bids.set({
    collectionAddress,
    tokenId,
    bid,
    signature,
    signerAddress,
  });

  res.status(201).json(result);
}

async function approveBid(req: Request, res: Response) {
  const { signature } = req.body;
  // get Bid data
  const Bids = DataStorage.getCollection("Bids");
  const bid = Bids.getById(req.params.id);

  // check if approve signer is owner of token
  if (
    !isLegitOwner(
      {
        collectionAddress: bid.collectionAddress,
        tokenId: bid.tokenId,
        bidderSignature: bid.signature,
        signature,
      },
      req.locals.web3Provider
    )
  )
    res.status(403).json({ message: "Signer is not the owner of NFT" });

  // execute
  bid.approvedSignature = signature;
  const result = Bids.set(bid);

  res.status(201).json(result);
}

async function isLegitOwner(
  { collectionAddress, tokenId, bidderSignature, signature },
  provider
) {
  const mockERC721 = await ERC721__factory.connect(collectionAddress, provider);

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
}

export default { list, read, create, approveBid };
