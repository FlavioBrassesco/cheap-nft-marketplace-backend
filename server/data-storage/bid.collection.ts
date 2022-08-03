import DataStorage from "./data-storage";
import crypto from "crypto";

export default class BidCollection {
  private _storage: typeof DataStorage;
  constructor(storage: typeof DataStorage) {
    this._storage = storage;
    if (!storage.app.locals["data-storage"]["bids"])
      storage.app.locals["data-storage"]["bids"] = {};
  }

  getId(signerAddress, collectionAddress, tokenId) {
    return crypto
      .createHash("md5")
      .update(`bid.id=${signerAddress}${collectionAddress}${tokenId}`)
      .digest("hex");
  }

  set(data) {
    const { signerAddress, collectionAddress, tokenId } = data;
    const id = this.getId(signerAddress, collectionAddress, tokenId);

    this._storage.app.locals["data-storage"]["bids"][id] = {
      ...data,
      _id: id,
    };
    return this._storage.app.locals["data-storage"]["bids"][id];
  }

  getById(id) {
    return this._storage.app.locals["data-storage"]["bids"][id];
  }

  get({ signerAddress, collectionAddress, tokenId }) {
    const id = this.getId(signerAddress, collectionAddress, tokenId);
    return this._storage.app.locals["data-storage"]["bids"][id];
  }

  getAll(filter) {
    let result = [];
    for (let key in this._storage.app.locals["data-storage"]["bids"]) {
      result.push(this._storage.app.locals["data-storage"]["bids"][key]);
    }

    if (filter)
      result = result.filter((b) => {
        let flag = true;
        for (let key in filter) {
          if (typeof b[key] !== "undefined" && filter[key] !== b[key])
            flag = false;
        }
        return flag;
      });

    return result;
  }

  clear(id) {
    return delete this._storage.app.locals["data-storage"]["bids"][id];
  }
}
