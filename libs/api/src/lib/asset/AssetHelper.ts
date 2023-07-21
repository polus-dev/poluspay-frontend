import { IAsset, IAssetsResponseFromApi } from '@poluspay-frontend/api';

let instance: Helper;

export const AssetHelper = (
    rawAssets: ConstructorParameters<typeof Helper>[0],
    isMerchant = false,
) => instance || new Helper(rawAssets, isMerchant);

export type AssetRepresentation = {
    name: string;
    categories: string[];
    networks: string[];
} & IAsset['networks'][string];

interface ISortedBy {
    [key: string]: AssetRepresentation[];
}

interface IAssetHelper {
    getAssetsByNetwork(network: string): ISortedBy[string];

    getAssetsByCategory(category: string, network: string): ISortedBy[string];

    getAsset(
        network: string,
        assetName: string,
    ): AssetRepresentation | undefined;

    getAllNetworks(): string[];

    getAllCategories(): string[];
}

export class Helper implements IAssetHelper {
    private sortedByCategory?: ISortedBy;
    private allNetworks?: string[];
    private allCategories?: string[];
    private sortedByNetwork?: ISortedBy;

    constructor(
        private rawAssets: IAssetsResponseFromApi,
        private isMerchant = false,
    ) {}

    getAllNetworks(): string[] {
        if (this.allNetworks) {
            return this.allNetworks;
        }
        const assetKeys = Object.keys(this.rawAssets);
        const networks = new Set<string>();
        for (const assetKey of assetKeys) {
            const asset = this.rawAssets[assetKey];
            for (const network in asset.networks) {
                networks.add(network);
            }
        }
        const result = Array.from(networks);
        this.allNetworks = result;
        return result;
    }

    getAllCategories(): string[] {
        if (this.allCategories) {
            return this.allCategories;
        }
        const assetKeys = Object.keys(this.rawAssets);
        const categories = new Set<string>();
        for (const assetKey of assetKeys) {
            const asset = this.rawAssets[assetKey];
            if (asset.categories) {
                for (const category of asset.categories) {
                    categories.add(category);
                }
            }
        }

        const result = Array.from(categories);
        this.allCategories = result;
        return result;
    }

    getAssetsByNetwork(network: string): ISortedBy[string] {
        if (this.sortedByNetwork?.[network]) {
            return this.sortedByNetwork[network];
        } else {
            const allAssetsKey = Object.keys(this.rawAssets);
            const filteredAssets: AssetRepresentation[] = [];
            for (const assetKey of allAssetsKey) {
                if (
                    Object.keys(this.rawAssets[assetKey].networks).includes(
                        network,
                    )
                ) {
                    const currentAsset = this.rawAssets[assetKey];
                    filteredAssets.push({
                        ...currentAsset.networks[network],
                        name: assetKey,
                        categories: currentAsset.categories || ['unknown'],
                        networks: Object.keys(currentAsset.networks),
                    });
                }
            }
            this.sortedByCategory = {
                ...this.sortedByCategory,
                [network]: filteredAssets,
            };
            if (this.isMerchant) {
                return filteredAssets.filter(
                    (asset) => asset.available_for_accept,
                );
            } else {
                return filteredAssets;
            }
        }
    }

    getAssetsByNetworks(networks: string[]): [AssetRepresentation[], string[]] {
        let result = [];
        for (const network of networks)
            result.push(...this.getAssetsByNetwork(network));
        // TODO: refactor
        return [result = result
            .flat()
            .filter(
                (asset, index, self) =>
                    self.findIndex((t) => t.name === asset.name) === index,
            ),
          [...new Set(result.map((e) => e.categories).flat())]
        ];
    }

    getAsset(
        network: string,
        assetName: string,
    ): AssetRepresentation | undefined {
        const assets = this.getAssetsByNetwork(network);
        return assets.find((asset) => asset.name === assetName);
    }

    getAssetsByCategory(network: string, category?: string): ISortedBy[string] {
        const assets = this.getAssetsByNetwork(network);
        if (!category) {
            return assets;
        } else {
            // if (this.sortedByCategory?.[category]) {
            //
            // }
            const filteredAssets = assets.filter((asset) =>
                asset.categories.includes(category),
            );
            if (this.isMerchant) {
                return filteredAssets.filter(
                    (asset) => asset.available_for_accept,
                );
            } else {
                return filteredAssets;
            }
        }
    }
}
