"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Serve static files (optional client)
app.use(express_1.default.static('public'));
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('send-message', (message) => {
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
