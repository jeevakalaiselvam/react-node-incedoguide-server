const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const tourRouter = require('./routes/tourRoutes.js');

const app = express();
app.enable('trust proxy');

//Middlewares
app.use(express.json());
app.use(compression());

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:6868',
};
//Allow CORS
app.use(cors(corsOptions));
app.use(helmet());

app.use('/api/v1', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Tourme API',
  });
});

app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
