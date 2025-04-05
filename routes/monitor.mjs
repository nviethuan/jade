import express from 'express';
import os from 'os';
import si from 'systeminformation';

const router = express.Router();

// Render the monitoring page
router.get('/', (req, res) => {
  res.render('monitor');
});

// Initialize Socket.IO
export function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected to monitoring system');

    // Send system metrics every second
    const interval = setInterval(async () => {
      try {
        // Get CPU usage using systeminformation
        const cpuLoad = await si.currentLoad();
        const cpuUsage = cpuLoad.currentLoad;
        
        // Get memory info using systeminformation
        const memInfo = await si.mem();
        const totalMem = memInfo.total;
        const usedMem = memInfo.used;
        const freeMem = memInfo.free;
        const activeMem = memInfo.active;
        const availableMem = memInfo.available;
        
        // Get Node.js process memory usage
        const processMemory = process.memoryUsage();
        const heapUsed = processMemory.heapUsed;
        const heapTotal = processMemory.heapTotal;
        const rss = processMemory.rss;
        const external = processMemory.external;
        
        // Convert to GB (1 GB = 1024 * 1024 * 1024 bytes)
        const totalRamGB = totalMem / (1024 * 1024 * 1024);
        const usedRamGB = usedMem / (1024 * 1024 * 1024);
        const freeRamGB = freeMem / (1024 * 1024 * 1024);
        const activeRamGB = activeMem / (1024 * 1024 * 1024);
        const availableRamGB = availableMem / (1024 * 1024 * 1024);
        const heapUsedGB = heapUsed / (1024 * 1024 * 1024);
        const heapTotalGB = heapTotal / (1024 * 1024 * 1024);
        const rssGB = rss / (1024 * 1024 * 1024);
        const externalGB = external / (1024 * 1024 * 1024);
        
        // Calculate percentages
        const ramUsagePercent = (usedMem / totalMem) * 100;
        const heapUsagePercent = (heapUsed / heapTotal) * 100;

        socket.emit('systemMetrics', {
          // CPU metrics
          cpu: cpuUsage,
          
          // System RAM metrics
          totalRamGB: totalRamGB,
          usedRamGB: usedRamGB,
          freeRamGB: freeRamGB,
          activeRamGB: activeRamGB,
          availableRamGB: availableRamGB,
          ramUsagePercent: ramUsagePercent,
          
          // Node.js process memory metrics
          heapUsedGB: heapUsedGB,
          heapTotalGB: heapTotalGB,
          rssGB: rssGB,
          externalGB: externalGB,
          heapUsagePercent: heapUsagePercent
        });
      } catch (error) {
        console.error('Error getting system metrics:', error);
      }
    }, 2000);

    socket.on('disconnect', () => {
      console.log('Client disconnected from monitoring system');
      clearInterval(interval);
    });
  });
}

export default router;
