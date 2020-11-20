import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import Product from "./models/Product";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Mongo is running on " + res.connection.port))
  .catch((error) => console.log(error));

app.get("/products", (req, res) => {
  Product.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.get("/products/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
