const emailServiceCCtv = require('./app/services/emailServiceCctv');
const emailServiceTs = require('./app/services/emailServiceTs');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const e = require('express');
const app = express();
const port = 5000;


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


/*Routers*/
app.use('/api/v1', routes);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

// Función para obtener los datos del email
emailServiceCCtv.getEmailData();
console.log("--------------------------------------------------")
emailServiceTs.getEmailData();

