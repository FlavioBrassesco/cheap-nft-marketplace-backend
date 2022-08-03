import DataStorage from "./data-storage";
import crypto from "crypto";

export default class AuctionCollection {
  private _storage: typeof DataStorage;
  constructor(storage: typeof DataStorage) {
    this._storage = storage;
    if (!storage.app.locals["data-storage"]["auctions"])
      storage.app.locals["data-storage"]["auctions"] = {};
  }

  getId(collectionAddress, tokenId) {
    return crypto
    .createHash("md5")
    .update(`auction.id=${collectionAddress}${tokenId}`)
    .digest("hex");
  }

  set(data) {
    const { collectionAddress, tokenId } = data;
    const id = this.getId(collectionAddress, tokenId);

    this._storage.app.locals["data-storage"]["auctions"][id] = {
      ...data,
      _id: id,
    };
    return this._storage.app.locals["data-storage"]["auctions"][id];
  }

  getById(id) {
    return this._storage.app.locals["data-storage"]["auctions"][id];
  }

  get({ collectionAddress, tokenId }) {
    const id = this.getId(collectionAddress, tokenId);
    return this._storage.app.locals["data-storage"]["auctions"][id];
  }

  getAll(filter) {
    let result = [];
    for (let key in this._storage.app.locals["data-storage"]["auctions"]) {
      result.push(this._storage.app.locals["data-storage"]["auctions"][key]);
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
    return delete this._storage.app.locals["data-storage"]["auctions"][id];
  }
}
