import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
// import { socketAuthMiddleware } from './middlewares/socketAuthMiddleware.js';
import apiRouter from './routes/apiRouter.js';
import { setupSocket } from './utils/socketUtils/socket.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

// Register socket middleware
// io.use(socketAuthMiddleware); // Uncomment this when connected through frontend

// Handle socket connections
setupSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Pong'
  });
});
1;

server.listen(PORT, () => {
  console.log('The server is live!', PORT);
  connectDB();
});
