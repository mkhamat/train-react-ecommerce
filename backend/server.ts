import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { router as products } from "./routes/productsRoutes";
import { router as users } from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.use(bodyParser.json());
app.use("/products", products);
app.use("/users", users);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Mongo is running on " + res.connection.port))
  .catch((error) => console.log(error));
