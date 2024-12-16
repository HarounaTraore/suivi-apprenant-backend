import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
import routes from "./src/routes/index.js";
import cors from "cors";

config();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
