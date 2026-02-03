import http from 'http';

const PORT = process.env.PORT || 3000;
const startTime = new Date();

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Parse URL
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  // Route: GET /status
  if (url.pathname === '/status' && req.method === 'GET') {
    const response = {
      status: 'ok',
      service: 'devops-assignment',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - startTime.getTime()) / 1000)
    };
    
    res.statusCode = 200;
    res.end(JSON.stringify(response, null, 2));
    return;
  }
  
  // Route: GET /health (simple health check)
  if (url.pathname === '/health' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({ healthy: true }, null, 2));
    return;
  }
  
  // Route: GET / (API info)
  if (url.pathname === '/' && req.method === 'GET') {
    const info = {
      name: 'DevOps Assignment API',
      version: '1.0.0',
      endpoints: {
        status: '/status',
        health: '/health'
      }
    };
    
    res.statusCode = 200;
    res.end(JSON.stringify(info, null, 2));
    return;
  }
  
  // 404 - Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ 
    error: 'Not Found',
    availableEndpoints: ['/', '/status', '/health']
  }, null, 2));
});

server.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}/status`);
  console.log(`✓ Health check at http://localhost:${PORT}/health`);
});

// Handle errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`✗ Error: Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error('✗ Server error:', error);
    process.exit(1);
  }
});

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log('✓ HTTP server closed gracefully');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('✗ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));