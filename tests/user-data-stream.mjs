import { Spot } from '@binance/connector';
import binanceConfig from '../configs/binance.config.mjs';

const client = new Spot(...binanceConfig.testnet);

const userDataStream = async () => {
  const response = await client.publicRequest('POST', '/api/v3/userDataStream');
  console.log('response:', response.data);
};

userDataStream();
