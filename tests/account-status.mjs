import { Spot } from '@binance/connector';
import binanceConfig from '../configs/binance.config.mjs';

const client = new Spot(...binanceConfig.testnet);

const accountStatus = () => {
  client.accountStatus().then((response) => {
    console.log('response', response.data);
  })
  .catch((error) => {
    console.log('error', error);
  });
};

accountStatus();
