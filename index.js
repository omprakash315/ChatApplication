import express from 'express';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
import { Socket } from 'node:dgram';



const app = express();
const server = createServer(app);
const io=new Server(server);
app.use(cors());

// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve("./Public")))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/Public/index.html'));
});

io.on('connection',(Socket)=>{
  console.log('a new client connected')
  Socket.on('chat message', (msg) => {
          console.log('Message received:', msg);
          io.emit('chat message', msg); 
  });
})

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat message', (msg) => {
//       console.log('Message received:', msg);
//       io.emit('chat message', msg); 
//   });
//   // socket.on('disconnect', () => {
//   //     console.log('user disconnected');
//   // });
// });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});