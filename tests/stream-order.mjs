import WebSocket from 'ws';

// get from tests/user-data-stream.mjs
const listenKey = 'kzMaLTafqXyHZX4uOi77TMlElwXg3djjFG2zuSaUKXCI0uM1SOEB5a7xXdl4';

const ws = new WebSocket(`wss://testnet.binance.vision/ws/${listenKey}`);

ws.on('open', () => {
  console.log('Connected to Binance WebSocket');
});

ws.on('message', (message) => {
  const data = JSON.parse(message);
  console.log('data', data);
});

ws.on('close', () => {
  console.log('Disconnected from Binance WebSocket');
});

