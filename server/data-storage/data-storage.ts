import { Express } from "express";

let instance: DataStorage;
let _app: Express;
let collections: any = {};

class DataStorage {
  constructor() {
    if (instance)
      throw new Error("You can only have one instance of DataStorage");
    instance = this;
  }

  public get app() {
    return _app;
  }

  public setApp(app: Express) {
    app.locals["data-storage"] = {};
    _app = app;
  }

  addCollection(name: string, Collection) {
    collections[name] = new Collection(this);
  }

  getCollection(name: string) {
    return collections[name];
  }

  drop() {
    _app.locals["data-storage"] = {};
  }
}

const singletonDataStorage = Object.freeze(new DataStorage());
export default singletonDataStorage;
