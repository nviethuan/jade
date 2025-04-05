import si from 'systeminformation';

si.mem().then(data => {
  console.log('Tổng RAM:', (data.total / 1024 / 1024).toFixed(2), 'MB');
  console.log('Đang sử dụng:', (data.active / 1024 / 1024).toFixed(2), 'MB');
  console.log('Còn trống:', (data.available / 1024 / 1024).toFixed(2), 'MB');
});