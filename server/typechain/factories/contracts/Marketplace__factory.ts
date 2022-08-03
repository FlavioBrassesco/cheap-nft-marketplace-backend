/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Marketplace,
  MarketplaceInterface,
} from "../../contracts/Marketplace";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collectionAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "erc20Address",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
        ],
        internalType: "struct Marketplace.AuctionData",
        name: "auctionData",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "bidderSig",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ownerApprovedSig",
        type: "bytes",
      },
    ],
    name: "finishAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collectionAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "erc20Address",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
        ],
        internalType: "struct Marketplace.AuctionData",
        name: "auctionData",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "bidderSig",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ownerApprovedSig",
        type: "bytes",
      },
    ],
    name: "getAuctionParticipants",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ba7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630f96837b1461003b578063b46def1214610050575b600080fd5b61004e610049366004610a25565b610094565b005b61006361005e366004610a25565b610340565b6040805173ffffffffffffffffffffffffffffffffffffffff93841681529290911660208301520160405180910390f35b600083600001518460200151856040015186606001516040516020016100ff9493929190606094851b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000090811682529390941b90921660148401526028830152604882015260680190565b604051602081830303815290604052805190602001209050600061017a84610174846040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b9061049a565b8451602086012090915060006101e185610174846040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b602088015160608901516040517f23b872dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301528085166024830152604482019290925292935016906323b872dd90606401602060405180830381600087803b15801561026657600080fd5b505af115801561027a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029e9190610ada565b50865160408089015190517f42842e0e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152868116602483015260448201929092529116906342842e0e90606401600060405180830381600087803b15801561031f57600080fd5b505af1158015610333573d6000803e3d6000fd5b5050505050505050505050565b600080600085600001518660200151876040015188606001516040516020016103ae9493929190606094851b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000090811682529390941b90921660148401526028830152604882015260680190565b604051602081830303815290604052805190602001209050600061042386610174846040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b86516020880120909150600061048a87610174846040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b9299929850919650505050505050565b60008060006104a985856104be565b915091506104b68161052e565b509392505050565b6000808251604114156104f55760208301516040840151606085015160001a6104e98782858561078f565b94509450505050610527565b82516040141561051f57602083015160408401516105148683836108a7565b935093505050610527565b506000905060025b9250929050565b600081600481111561054257610542610b03565b141561054b5750565b600181600481111561055f5761055f610b03565b14156105cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064015b60405180910390fd5b60028160048111156105e0576105e0610b03565b1415610648576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016105c3565b600381600481111561065c5761065c610b03565b14156106ea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f756500000000000000000000000000000000000000000000000000000000000060648201526084016105c3565b60048160048111156106fe576106fe610b03565b141561078c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c60448201527f756500000000000000000000000000000000000000000000000000000000000060648201526084016105c3565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156107c6575060009050600361089e565b8460ff16601b141580156107de57508460ff16601c14155b156107ef575060009050600461089e565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610843573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166108975760006001925092505061089e565b9150600090505b94509492505050565b6000807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8316816108dd60ff86901c601b610b32565b90506108eb8782888561078f565b935093505050935093915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516080810167ffffffffffffffff8111828210171561094b5761094b6108f9565b60405290565b803573ffffffffffffffffffffffffffffffffffffffff8116811461097557600080fd5b919050565b600082601f83011261098b57600080fd5b813567ffffffffffffffff808211156109a6576109a66108f9565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019082821181831017156109ec576109ec6108f9565b81604052838152866020858801011115610a0557600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600083850360c0811215610a3b57600080fd5b6080811215610a4957600080fd5b50610a52610928565b610a5b85610951565b8152610a6960208601610951565b6020820152604085013560408201526060850135606082015280935050608084013567ffffffffffffffff80821115610aa157600080fd5b610aad8783880161097a565b935060a0860135915080821115610ac357600080fd5b50610ad08682870161097a565b9150509250925092565b600060208284031215610aec57600080fd5b81518015158114610afc57600080fd5b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60008219821115610b6c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b50019056fea26469706673582212203d6f172fc82fde7bbcae950aaac83b1183bcde7e2fb5a71d5523ab6edb59944164736f6c63430008090033";

type MarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Marketplace__factory extends ContractFactory {
  constructor(...args: MarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Marketplace> {
    return super.deploy(overrides || {}) as Promise<Marketplace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  override connect(signer: Signer): Marketplace__factory {
    return super.connect(signer) as Marketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new utils.Interface(_abi) as MarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}