import { UniversalSDK } from "@defund-protocol/v1-sdk";
import { Overrides, Wallet, providers } from "ethers";

async function trade_defund(fundAddress: string, from: string, to: string, slippage: number, share: number, network: string, options?: Overrides) {
    const chainId = networkToChainId(network);
    const signer = getSigner();

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

function rpcProvider() {
    return new providers.JsonRpcProvider("your rpc url");
}

function getSigner() {
    const privateKey = 'your private key';
    return new Wallet(privateKey, rpcProvider());
}

export { trade_defund };
