const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`
);

exports.getAdminUserDetails = async (req, res) => {
  const { userid } = req.query;
  console.log(userid);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  res.status(200).json({
    status: 'success',
    message: 'Admin User Route reached',
  });
};
