const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    HOST: "localhost",
    USER:process.env.USER,
    PASSWORD:process.env.PASSWORD,
    DB: process.env.DB,
    dialect: 'mysql',
    PORT:'3306',
   
}