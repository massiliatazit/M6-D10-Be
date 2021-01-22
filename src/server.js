const express = require("express");
const cors = require("cors");
const database = require("./utilities/database");

const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./utilities/errorHandling");
const productRouter = require("./services/product");
const categoryRouter = require("./services/category");
const reviewRouter = require("./services/review");

const server = express();
const port = process.env.PORT || 6001;

server.use(cors());
server.use(express.json());

server.use("/reviews", reviewRouter);
server.use("/categories", categoryRouter);
server.use("/products", productRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

database.sequelize.sync({ force: false }).then((result) => {
  server.listen(port, () => {
    console.log("Server is running on", port);
  });
});