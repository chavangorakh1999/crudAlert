
const app = require('./app');
const socketIO = require('socket.io');

/**
 * * Expose app to server
 */

const port = process.env.PORT || 3000;
const server=app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/**
 * * Socket implementation to broadcast the event update
 * ! Did not maintain the socket id for further utilisation
 */

const io = socketIO(server,{cors: {
    origin: "http://localhost:3000"
  }});

// Maintain  gloabal io var
global.io=io;



// Socket.IO event handlers
io.on('connection', socket => {
  console.log(`New client connected: ${socket.id}`);

  // Handle broadcast messages
  socket.on('broadcast', message => {
    console.log(`Broadcast message received: ${message}`);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('message', message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

