import { UniversalSDK } from "@defund-protocol/v1-sdk";
import { Overrides, Wallet, providers } from "ethers";
import * as dotenv from 'dotenv';

dotenv.config()

async function trade_defund(fundAddress: string, from: string, to: string, slippage: number, share: number, network: string, options?: Overrides) {
    const chainId = networkToChainId(network);
    const signer = getSigner(network);

    const convertParams = {
        ratio: Math.floor(share * 100),
        tokenIn: from,
        tokenOut: to,
        slippage: Math.floor(slippage * 100),
        useNative: false,
    };

    const convertTx = await new UniversalSDK(chainId, signer).executeAssetsConvert(
        signer.address,
        fundAddress,
        convertParams,
        false,
        options
    );
    
    return convertTx;
}

function networkToChainId(network: string): number {
    switch (network) {
        case 'ethereum':
            return 1;
        case 'polygon':
            return 137;
        case 'mumbai':
            return 80001;
        default:
            throw new Error(`Unsupported network: ${network}`)
    }
}

function rpcProvider(network: string) {
  let url;
  switch (network) {
    case "ethereum":
          url =`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`; 
          break;
    case "arbitrum":
          url =`https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`; 
          break;
    case "polygon":
      url = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
      break;
    case "optimism":
      url = `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
      break;
    default:
      throw Error("network not supported");
  }
   return new providers.JsonRpcProvider(url);
}

function getSigner() {
    return new Wallet(process.env.PRIVATE_KEY as string, rpcProvider(network));
}
async function poolComposition(poolAddress: string, network: string) {
    const chainId = networkToChainId(network);
    const signer = getSigner(network);
    const assets = await new UniversalSDK(chainId, signer).getFundAssets(poolAddress);
    return assets;
}
export { trade_defund };
export { poolComposition };
