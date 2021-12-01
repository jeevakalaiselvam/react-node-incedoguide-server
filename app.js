const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const userRouter = require('./routes/userRoutes.js');
const projectRouter = require('./routes/projectRoutes.js');
const guideRouter = require('./routes/guideRoutes.js');
const auditRouter = require('./routes/auditRoutes.js');
const database = require('./config/database');

//Setup DB Connection
database
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log('Database connection failure!', error));

//Create Express Apps
const app = express();
app.enable('trust proxy');

//Middlewares
app.use(express.json());
app.use(compression());

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' || 
};
//Allow CORS
app.use(cors(corsOptions));
//app.use(cors());
app.use(helmet());

//Handle all API Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/guide', guideRouter);
app.use('/api/v1/audit', auditRouter);

app.use('/api/v1', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Incedo Guide API',
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
