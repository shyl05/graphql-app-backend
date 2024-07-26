import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import schema from "./src/schema";
import dbConfig from "./src/config/dbconfig";

dotenv.config();
app.use(morgan("common"));

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use(express.json());

// DB CONNECTION
dbConfig();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

// Start backend server
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;