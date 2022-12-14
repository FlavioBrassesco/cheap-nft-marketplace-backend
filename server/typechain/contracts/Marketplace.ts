/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace Marketplace {
  export type AuctionDataStruct = {
    collectionAddress: PromiseOrValue<string>;
    erc20Address: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    bid: PromiseOrValue<BigNumberish>;
  };

  export type AuctionDataStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    collectionAddress: string;
    erc20Address: string;
    tokenId: BigNumber;
    bid: BigNumber;
  };
}

export interface MarketplaceInterface extends utils.Interface {
  functions: {
    "finishAuction((address,address,uint256,uint256),bytes,bytes)": FunctionFragment;
    "getAuctionParticipants((address,address,uint256,uint256),bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "finishAuction" | "getAuctionParticipants"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "finishAuction",
    values: [
      Marketplace.AuctionDataStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionParticipants",
    values: [
      Marketplace.AuctionDataStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "finishAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionParticipants",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketplaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    finishAuction(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAuctionParticipants(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string]>;
  };

  finishAuction(
    auctionData: Marketplace.AuctionDataStruct,
    bidderSig: PromiseOrValue<BytesLike>,
    ownerApprovedSig: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAuctionParticipants(
    auctionData: Marketplace.AuctionDataStruct,
    bidderSig: PromiseOrValue<BytesLike>,
    ownerApprovedSig: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string]>;

  callStatic: {
    finishAuction(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAuctionParticipants(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string]>;
  };

  filters: {};

  estimateGas: {
    finishAuction(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAuctionParticipants(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    finishAuction(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAuctionParticipants(
      auctionData: Marketplace.AuctionDataStruct,
      bidderSig: PromiseOrValue<BytesLike>,
      ownerApprovedSig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
