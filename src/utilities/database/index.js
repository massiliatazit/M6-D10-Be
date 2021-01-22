const { Sequelize, DataTypes } = require("sequelize");
const product = require("../models/product");
const review = require("../models/review");
const category = require("../models/category");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
port: process.env.PGPORT,
    dialect: "postgres",

  }
);
const models = {
  //OBJECT CONTAINING MODELS OF THE TABLES
  product: product(sequelize, DataTypes),
  category: category(sequelize, DataTypes),
  review: review(sequelize, DataTypes),
 
};

//GOES THROUGH EACH KEY OF THE MODEL OBJECT ABOVE (e.g. Author: Author(sequelize, DataTypes)) AND CREATES TABLE RELATIONS DEPENDING ON CODE INSIDE EACH MODEL
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    //IF THE WORD ASSOCIATE IS PRESENT INSIDE THE MODEL, IT WILL RUN THE FOLLOWING CODE
    models[modelName].associate(models); //RUNS THE .associate INSIDE THE MODEL, WHICH IS CODE THAT DEFINES THE TABLES RELATIONS
  }
});

models.sequelize = sequelize; //PUTS TABLE MODELS INTO SEQUELIZE
models.Sequelize = Sequelize; 

sequelize
  .authenticate() //TESTS IF SEQUELIZE IS CONNECTED TO OUR DATABASE
  .then(() =>
    console.log(
      "------------------------------------------ Connection established ------------------------------------------"
    )
  )
  .catch((e) => {
    console.log(
      "------------------------------------------ Connection failed ------------------------------------------"
    ),
      console.log(e);
  });

module.exports = models; //EXPORTS SEQUELIZE CONTAINING TABLE MODELS TO SERVER.JS