// src/polkadotService.ts
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { Option } from '@polkadot/types/codec';
import { type Codec } from '@polkadot/types/types';

const WESTEND_RELAY_WSS = 'wss://westend-rpc.polkadot.io';
// const WESTEND_CORETIME_WSS = 'wss://coretime-westend-rpc.dwellir.com';

class PolkadotService {
    public relayApi: ApiPromise;
    // public parachainApi: ApiPromise;

// Updated constructor
    constructor(relayApi: ApiPromise) {
        this.relayApi = relayApi;
        // this.parachainApi = parachainApi;
    }

    public static async connect(): Promise<PolkadotService> {
        try {
            console.log(`Connecting to Westend Relay Chain at ${WESTEND_RELAY_WSS}...`);
            const wsProviderRelay = new WsProvider(WESTEND_RELAY_WSS);
            const relayApi = await ApiPromise.create({ provider: wsProviderRelay });
            
            // console.log(`Connecting to Westend Coretime Parachain at ${WESTEND_CORETIME_WSS}...`);
            // const wsProviderPara = new WsProvider(WESTEND_CORETIME_WSS);
            // const parachainApi = await ApiPromise.create({ provider: wsProviderPara });

            await relayApi.isReady;

            const relayChain = await relayApi.rpc.system.chain();
            console.log(`Successfully connected to Relay Chain: ${relayChain}`);
            // const paraChain = await parachainApi.rpc.system.chain();
            // console.log(`Successfully connected to Parachain: ${paraChain}`);

            return new PolkadotService(relayApi);

        } catch (error) {
            console.error("!!! FAILED TO CONNECT TO POLKADOT !!!");
            console.error("The raw error is:", error);
            throw new Error(`Polkadot connection failed: ${error}`);
        }
    }

    /**
     * Tool 1: Gets the current price for On-Demand Coretime.
     */
    public async getOnDemandPrice(): Promise<string> {
        // ... (this function is fine, no changes needed)
        try {
            const price = (await this.relayApi.query.onDemand.spotPrice()) as Option<Codec>;
            
            if (price.isSome) {
                return price.unwrap().toString();
            } else {
                return "On-demand price not available.";
            }

        } catch (error) {
            console.error("Error fetching on-demand price:", error);
            return "Error fetching price.";
        }
    }

    /**
     * Tool 2: Gets the current Bulk Coretime sale information.
     */
    public async getBulkSaleInfo(): Promise<object> {
        // --- MODIFY THIS FUNCTION ---
        console.warn("getBulkSaleInfo is disabled because the parachain is offline.");
        return Promise.resolve({ error: "Coretime parachain is temporarily offline." });
        /*
        try {
            const saleInfo = (await this.parachainApi.query.broker.saleInfo()) as Option<Codec>;
            
            if (saleInfo.isSome) {
                const jsonValue = saleInfo.unwrap().toJSON();
                if (typeof jsonValue === 'object' && jsonValue !== null && !Array.isArray(jsonValue)) {
                    return jsonValue;
                }
                return { error: "Sale info was not a valid object.", rawValue: jsonValue };
            } else {
                return { error: "Bulk sale info not available." };
            }
        } catch (error) {
            console.error("Error fetching bulk sale info:", error);
            return { error: `Error fetching sale info: ${error}` };
        }
        */
        // --- END OF CODE TO COMMENT OUT ---
    }

    /**
     * Enables auto-renewal for a core.
     */
    public async enableAutoRenewal(privateKeySeed: string, coreIndex: number): Promise<string> {
        return "Coretime parachain is temporarily offline.";
    }

    /**
     * List a core for sale.
     */
    public async listCoretimeForSale(privateKeySeed: string, coreIndex: number, price: number): Promise<string> {
        return "Coretime parachain is temporarily offline.";
    }
}

export default PolkadotService;
