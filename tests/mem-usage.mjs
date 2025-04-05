import os from 'os';

// Tổng dung lượng RAM (bytes)
const totalMem = os.totalmem();

// RAM còn trống (bytes)
const freeMem = os.freemem();

// RAM đang sử dụng (bytes)
const usedMem = totalMem - freeMem;

// Hiển thị dưới dạng MB hoặc GB cho dễ đọc
console.log('Tổng RAM:', (totalMem / 1024 / 1024).toFixed(2), 'MB');
console.log('RAM còn trống:', (freeMem / 1024 / 1024).toFixed(2), 'MB');
console.log('RAM đang sử dụng:', (usedMem / 1024 / 1024).toFixed(2), 'MB');
