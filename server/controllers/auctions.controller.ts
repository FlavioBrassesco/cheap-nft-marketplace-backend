import { ethers } from "ethers";
import { Request, Response } from "express";
import { ERC721__factory } from "../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory";
import DataStorage from "../data-storage/data-storage";

function list(req: Request, res: Response) {
  const Auctions = DataStorage.getCollection("Auctions");
  // this of course needs to be validated, sanitized and secured in a real enviroment
  // query should also be paged
  const result = Auctions.getAll(req.query);
  res.status(200).json(result);
}

function read(req: Request, res: Response) {
  const { id } = req.params;
  const Auctions = DataStorage.getCollection("Auctions");
  const result = Auctions.getById(id);
  res.status(200).json(result);
}

async function create(req: Request, res: Response) {
  if (!isLegitOwner(req.body, req.locals.web3Provider))
    res.status(403).json({ message: "Signer is not the owner of token" });

  const Auctions = DataStorage.getCollection("Auctions");
  const result = Auctions.set(req.body);

  res.status(201).json(result);
}

async function isLegitOwner(
  { collectionAddress, tokenId, floorPrice, signature },
  provider
) {
  const mockERC721 = await ERC721__factory.connect(collectionAddress, provider);

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
}

export default { list, read, create };
