const  { Sequelize,DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig.js");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAlliases: false, // error showing
   
   }
)

sequelize.authenticate()
    .then(() => {
    console.log('connected successful')
    }).catch(err => {
    console.log("Error" + err)
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.payments = require("./Payment.js")(sequelize, DataTypes);


// db.sequelize.sync({
//     force: false, alter: true,
// }).then(() => {
//     console.log('yes re-sync done')
// });

module.exports = {db};