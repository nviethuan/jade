import { Spot } from '@binance/connector';
// import { Spot, SpotRestAPI } from '@binance/spot';
const API_KEY = 'yzjjXMHhjsGnxbOEzve6fz61vvw0HOinfhV2rXAAOdn72JhscfUIlkCFvgjv8xGt';
const API_SECRET = 'UJo7NOmMqjXvmF0ochoPvaHhkzXXuLJ5k6kVHxl9TWfQWMj7FSx40aPp9e373LmG';
const BASE_URL = 'https://testnet.binance.vision';

const client = new Spot(API_KEY, API_SECRET, {
  baseURL: BASE_URL,
});

const showAllProps = () => {
  // Get all properties including inherited ones
  const getAllProperties = (obj) => {
    const properties = new Set();
    let currentObj = obj;
    
    while (currentObj) {
      Object.getOwnPropertyNames(currentObj).forEach(prop => {
        properties.add(prop);
      });
      currentObj = Object.getPrototypeOf(currentObj);
    }
    
    return Array.from(properties);
  };

  const allMethods = getAllProperties(client);
  allMethods.forEach(method => {
    console.log(method);
  });
};

showAllProps();
