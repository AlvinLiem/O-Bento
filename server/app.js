if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require(`express`);
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
const cors = require(`cors`);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(`/`, routes);

app.use(errorHandler);

module.exports = app;
