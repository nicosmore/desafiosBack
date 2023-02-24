const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,  
  PORT: process.env.PORT,
  DATASOURCE: process.env.DATASOURCE, 
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,  
  SESSION_SECRET: process.env.SESSION_SECRET,
  TEST_MAIL: process.env.TEST_MAIL,
  PASSWORD_MAIL: process.env.PASSWORD_MAIL,
}