require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (err) {
    console.log('Failed to connect to the database', err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectToDatabase };
