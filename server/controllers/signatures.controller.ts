import { Request, Response } from "express";
import DataStorage from "../data-storage/data-storage";

function list(req: Request, res: Response) {
  const { collectionAddress, tokenId } = req.params;
  let filter;
  if (collectionAddress) filter = { ...filter, collectionAddress };
  if (tokenId) filter = { ...filter, tokenId: parseInt(tokenId) };

  // this of course needs to be sanitized and secured in a real enviroment
  // Query should also be paged
  const Bids = DataStorage.getCollection("Bids");
  const bids = Bids.getAll(filter);

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
          [c.bidderAddress]: {
            bidderSignature: c.bidderSignature,
            approvedSignature: c.approvedSignature,
          },
        },
      },
    };

    // fill arrays of unique values for quick traversing the output hashmap
    if (!output.collections) 
      output.collections = new JsonSet();
    output.collections.add(c.collectionAddress);

    if (!output[c.collectionAddress].tokens)
      output[c.collectionAddress].tokens = new JsonSet();
    output[c.collectionAddress].tokens.add(c.tokenId);

    if (!output[c.collectionAddress][c.tokenId].signers)
      output[c.collectionAddress][c.tokenId].signers = new JsonSet();
    output[c.collectionAddress][c.tokenId].signers.add(c.bidderAddress);

    return output;
  }, {});

  res.status(200).json(result);
}

class JsonSet extends Set {
  constructor(...args) {
    super(...args);
  }

  toJSON() {
    return Array.from(this);
  }
}

export default { list };
