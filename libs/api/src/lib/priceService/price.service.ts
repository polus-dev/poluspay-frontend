import Currency from './symbols';
import { CryptoPrice } from './dto/cryptoPrice.dto';
import { ResponseFromBinance } from './dto/responseFromBinance.dto';
import axios from 'axios';

export class PriceService {
    symbols: Currency[] = [
        Currency.BTCUSDT,
        Currency.ETHUSDT,
        Currency.BNBUSDT,
        // Currency.SOLUSDT,
    ];

    private _interval = 30_000;
    private _mainLoopInterval!: NodeJS.Timer;
    private readonly logger = console;

    constructor(private priceUrl: string) {}

    startMainLoop(
        callBack: (price: CryptoPrice[]) => void,
        symbols: Currency[] = this.symbols
    ) {
        const fn = async () => {
            const freshPrice = await this.getPrice(symbols);

            callBack(freshPrice);
        };
        fn();

        this._mainLoopInterval = setInterval(async () => {
            fn();
        }, this._interval);
    }

    getPrice(symbol: Currency): Promise<CryptoPrice>;
    getPrice(symbols: Currency[]): Promise<CryptoPrice[]>;

    async getPrice(
        symbol: Currency[] | Currency
    ): Promise<CryptoPrice[] | CryptoPrice> {
        try {
            const response = await axios.get<
                ResponseFromBinance[] | ResponseFromBinance
            >(
                typeof symbol == 'string'
                    ? this.priceUrl + '?symbol=' + symbol
                    : this._encodeURL(this.priceUrl, symbol, 'symbols')
            );

            if (Array.isArray(response.data)) {
                return response.data.map((price) => {
                    return {
                        symbol: price.symbol,
                        priceChange: price.priceChange,
                        priceChangePercent: price.priceChangePercent,
                        prevPrice: price.prevClosePrice,
                        currentPrice: price.lastPrice,
                        volume: price.quoteVolume,
                    };
                });
            } else {
                return {
                    symbol: response.data.symbol,
                    priceChange: response.data.priceChange,
                    priceChangePercent: response.data.priceChangePercent,
                    prevPrice: response.data.prevClosePrice,
                    currentPrice: response.data.lastPrice,
                    volume: response.data.quoteVolume,
                };
            }
        } catch (error) {
            this.logger.error(error);

            return [];
        }
    }
    stopMainLoop() {
        clearInterval(this._mainLoopInterval);
    }

    private _encodeURL(url: string, params: string[], paramName: string) {
        let temp = url + '?' + paramName + '=';
        temp += '%5B';

        for (let i = 0; i < params.length; i++) {
            temp += '%22' + params[i] + '%22';

            if (i != params.length - 1) temp += ',';
        }

        return (temp += '%5D');
    }
}
