import { Spot } from '@binance/connector';
import binanceConfig from '../configs/binance.config.mjs';

const client = new Spot(...binanceConfig.mainnet);

const historicalTrades = async () => {
  const response = await client.historicalTrades('ICXUSDT');
  console.log('response', response.data);
};

// https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#old-trade-lookup
// node_modules/@binance/connector/src/modules/restful/market.js
await historicalTrades();
