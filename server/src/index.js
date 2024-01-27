const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const express = require('express');
const morgan = require('morgan');
const e = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();
const app = express();

// Puerto de la aplicación
const port = process.env.PORT || 5000;


// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Función para habilitar CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);


/**
 * Socket
 */
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket events
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('mensaje', 'Bienvenido!');

  socket.on('prueba', (msg) => {
    console.log(msg); 
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Socket middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

/*Routers*/
app.use('/api/v1', routes);

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
