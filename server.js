const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./Routes/userRouter");
const productRouter = require("./Routes/productRouter");
const app = express();

require("dotenv").config();
const db = require("./config/db");
db();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
