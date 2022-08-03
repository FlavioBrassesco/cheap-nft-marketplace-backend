import { Request, Response } from "express";
import DataStorage from "../data-storage/data-storage";
import { token } from "../typechain/@openzeppelin/contracts";

class JsonSet extends Set {
  constructor(...args) {
    super(...args);
  }

  toJSON() {
    return Array.from(this);
  }
}

function list(req: Request, res: Response) {
  const Bids = DataStorage.getCollection("Bids");
  const { collectionAddress, tokenId } = req.params;
  let filter;
  if (collectionAddress) filter = { ...filter, collectionAddress };
  if (tokenId) filter = { ...filter, tokenId: parseInt(tokenId) };
  // this of course needs to be sanitized and secured in a real enviroment
  const bids = Bids.getAll(filter);
  // previous query should also be paged if unfiltered

  // compile and normalize data
  let result = bids.reduce((p, c) => {
    const collectionObj = p[c.collectionAddress] || {};
    const tokenObj = collectionObj[c.tokenId] || {};

    const output = {
      ...p,
      [c.collectionAddress]: {
        ...collectionObj,
        [c.tokenId]: {
          ...tokenObj,
          [c.signerAddress]: {
            bidderSignature: c.signature,
            approvedSignature: c.approvedSignature,
          },
        },
      },
    };

    // fill arrays of unique values for traversing the output hashmap
    if (!output.collections) 
      output.collections = new JsonSet();
    output.collections.add(c.collectionAddress);

    if (!output[c.collectionAddress].tokens)
      output[c.collectionAddress].tokens = new JsonSet();
    output[c.collectionAddress].tokens.add(c.tokenId);

    if (!output[c.collectionAddress][c.tokenId].signers)
      output[c.collectionAddress][c.tokenId].signers = new JsonSet();
    output[c.collectionAddress][c.tokenId].signers.add(c.signerAddress);

    return output;
  }, {});

  res.status(200).json(result);
}

export default { list };
