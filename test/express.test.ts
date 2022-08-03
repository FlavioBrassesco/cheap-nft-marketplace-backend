import request from "supertest";
import app from "../server/express";
import { ERC721__factory } from "../server/typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory";
import { ethers } from "ethers";

jest.mock(
  "../server/typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory",
  () => {
    return {
      ERC721__factory: {
        connect: jest.fn(),
      },
    };
  }
);

// wallets
const ownerWallet = ethers.Wallet.createRandom();
const bidderWallet = ethers.Wallet.createRandom();

// This is by no means a full testing suite and is comprised in one file for the sake of quickness
// The test suite is programmed to run all tests in a serial fashion. it.only won't work here
describe("Cheap NFT Marketplace", () => {
  describe("Auctions", () => {
    async function createAuction(data) {
      const hashedData = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [data.collectionAddress, data.tokenId, data.floorPrice]
      );

      const ownerSig = await ownerWallet.signMessage(
        ethers.utils.arrayify(hashedData)
      );

      // @ts-expect-error
      ERC721__factory.connect.mockImplementationOnce(() => {
        return {
          ownerOf: () => ownerWallet.address,
        };
      });

      const res = await request(app)
        .post("/api/auctions")
        .send({
          ...data,
          signature: ownerSig,
        });
      return res;
    }

    it("should create auction", async () => {
      const data = {
        collectionAddress: "0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a",
        tokenId: 0,
        floorPrice: ethers.utils.parseEther("0.1"),
      };
      const res = await createAuction(data);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        ...data,
        floorPrice: data.floorPrice.toJSON(),
        signature: expect.any(String),
        _id: expect.any(String),
      });
    });

    it("should get all auctions", async () => {
      const data = {
        collectionAddress: "0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a",
        tokenId: 1,
        floorPrice: ethers.utils.parseEther("0.1"),
      };
      await createAuction(data);

      const res = await request(app).get("/api/auctions");

      expect(res.body).toHaveLength(2);
      expect(res.body[1]).toMatchObject({
        ...data,
        floorPrice: data.floorPrice.toJSON(),
        signature: expect.any(String),
        _id: expect.any(String),
      });
    });
  });

  describe("Bids", () => {
    async function createBid(data) {
      const hashedData = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [data.collectionAddress, data.tokenId, data.bid]
      );

      const bidderSig = await bidderWallet.signMessage(
        ethers.utils.arrayify(hashedData)
      );

      const res = await request(app)
        .post("/api/bids")
        .send({
          ...data,
          signature: bidderSig,
        });
      return res;
    }

    it("should create bid", async () => {
      const data = {
        collectionAddress: "0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a",
        tokenId: 0,
        bid: ethers.utils.parseEther("1.0"),
      };
      const res = await createBid(data);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        ...data,
        bid: data.bid.toJSON(),
        signature: expect.any(String),
        _id: expect.any(String),
      });
    });

    it("should get all bids", async () => {
      const data = {
        collectionAddress: "0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a",
        tokenId: 1,
        bid: ethers.utils.parseEther("1.0"),
      };
      await createBid(data);

      const res = await request(app).get("/api/bids");

      expect(res.body).toHaveLength(2);
      expect(res.body[1]).toMatchObject({
        ...data,
        bid: data.bid.toJSON(),
        signature: expect.any(String),
        _id: expect.any(String),
      });
    });

    it("should approve bid", async () => {
      const data = {
        collectionAddress: "0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a",
        tokenId: 1,
        bid: ethers.utils.parseEther("1.0"),
      };
      const { body: bid } = await createBid(data);

      const hashedData = ethers.utils.solidityKeccak256(
        ["bytes"],
        [bid.signature]
      );
      const ownerSig = await ownerWallet.signMessage(
        ethers.utils.arrayify(hashedData)
      );

      // @ts-expect-error
      ERC721__factory.connect.mockImplementationOnce(() => {
        return {
          ownerOf: () => ownerWallet.address,
        };
      });

      const res = await request(app).post(`/api/bids/${bid._id}`).send({
        signature: ownerSig,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        ...bid,
        approvedSignature: ownerSig,
      });
    });
  });

  describe("Signatures", () => {
    it("should list all bids signatures by collection and tokenId", async () => {
      const res = await request(app).get(
        "/api/signatures/0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a/1"
      );

      expect(res.body).toEqual(
        expect.objectContaining({
          ["0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a"]: {
            "1": {
              [bidderWallet.address]: {
                bidderSignature: expect.any(String),
                approvedSignature: expect.any(String),
              },
              signers: [bidderWallet.address],
            },
            tokens: [1],
          },
          collections: ["0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a"],
        })
      );
    });
  });
});
