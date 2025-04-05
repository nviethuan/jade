import WebSocket from 'ws';

const ws = new WebSocket('wss://testnet.binance.vision/ws-api/v3');

ws.on('open', () => {
  console.log('Connected to Binance WebSocket');
});

ws.on('message', (message) => {
  console.log(message);
});

ws.on('close', () => {
  console.log('Disconnected from Binance WebSocket');
});

ws.on('disconnected', () => {
  console.log('Disconnected from Binance WebSocket');
});

ws.on('error', (error) => {
  console.error(error);
});

ws.on('ping', (data) => {
  ws.pong(data);
});

export default ws;
