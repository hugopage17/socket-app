import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (optional client)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('send-message', (message: string) => {
    console.log(`Received: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log('Server listening on http://localhost:5000');
});
