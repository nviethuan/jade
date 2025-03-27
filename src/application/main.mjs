import connector from '@binance/connector-typescript';

const callbacks = {
  open: (client) => client.exchangeInfo(),
  close: () => console.debug('Disconnected from WebSocket server'),
  message: (data) => console.info(JSON.parse(data)),
};

const client = new connector.WebsocketAPI(process.env.BINANCE__API_KEY, process.env.BINANCE__SECRET_KEY, {
  baseURL: 'wss://testnet.binance.vision/ws-api/v3',
  callbacks,
});

setTimeout(() => client.disconnect(), 20000);

export default client;
