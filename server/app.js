import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
import { connectDb } from "./connectDb.js";
import cors from "cors";

const app = express();

// allow cors
app.use(cors());

connectDb();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
