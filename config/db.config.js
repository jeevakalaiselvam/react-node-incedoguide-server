module.exports = {
  HOST: 'incedoguidedb.czyr2a17d8x9.ap-south-1.rds.amazonaws.com',
  USER: 'admin',
  PASSWORD: 'admin123',
  DB: 'incedotestdb',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
