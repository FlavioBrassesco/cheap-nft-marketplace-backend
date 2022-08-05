import { ethers } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";
import { Request, Response } from "express";
import { ERC721__factory } from "../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory";
import DataStorage from "../data-storage/data-storage";

async function create(req: Request, res: Response) {
  const { collectionAddress, 
          tokenId, 
          floorPrice, 
          signature, 
          ownerAddress } = req.body;

  if (
    !(collectionAddress &&
      tokenId >= 0 &&
      floorPrice &&
      signature &&
      ownerAddress)
  )
    res.status(400).json({ message: "Request is malformed" });

  if (!isLegitOwner(req.body, req.locals.web3Provider))
    res.status(403).json({ message: "Signer is not the owner of token" });

  const Auctions = DataStorage.getCollection("Auctions");
  const result = Auctions.set({
    collectionAddress,
    tokenId,
    floorPrice,
    signature,
    ownerAddress,
  });

  res.status(201).json(result);
}

function list(req: Request, res: Response) {
  // this of course needs to be validated, sanitized and secured in a real enviroment
  // query should also be paged
  const Auctions = DataStorage.getCollection("Auctions");
  const result = Auctions.getAll(req.query);
  res.status(200).json(result);
}

function read(req: Request, res: Response) {
  const { id } = req.params;
  const Auctions = DataStorage.getCollection("Auctions");
  const result = Auctions.getById(id);
  res.status(200).json(result);
}

async function remove(req: Request, res: Response) {
  const { id } = req.params;

  const Auctions = DataStorage.getCollection("Auctions");
  const auction = Auctions.getById(id);
  if (!auction) res.status(404).json({ message: "Auction not found" });

  // only owner of auction can delete it if a proper signature is sent
  let recoveredAddress;
  if (req.body.signature) {
    const messageHash = ethers.utils.solidityKeccak256(["string"], [id]);
    recoveredAddress = await ethers.utils.verifyMessage(
      ethers.utils.arrayify(messageHash),
      <SignatureLike>req.body.signature
    );
    if(auction.ownerAddress !== recoveredAddress)
      return res.status(403)
                .json({ message: "Signer is not the owner of the auction "})
  }

  // marketplace should have an authorization token to send when an auction is completed
  // this is ommited here as this is only a demo, but should be implemented
  Auctions.clear(id);
  res.status(204).json();
}

async function isLegitOwner(
  { collectionAddress, tokenId, floorPrice, signature },
  provider
) {
  // an error in this function could break express-async-error
  try {
    const mockERC721 = await ERC721__factory.connect(
      collectionAddress,
      provider
    );

    const messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "uint256"],
      [collectionAddress, tokenId, floorPrice]
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

export default { create, list, read, remove };
