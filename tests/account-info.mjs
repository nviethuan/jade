import { Spot } from '@binance/connector';
import binanceConfig from '../configs/binance.config.mjs';

const client = new Spot(...binanceConfig.testnet);

const accountInfo = async () => {
  const response = await client.account();
  response.data.balances.forEach((balance) => {
    if (Number(balance.free) > 0) {
      console.log('balance', balance);
    }
  });
  console.log('done');
};

accountInfo();
