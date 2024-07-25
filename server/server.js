require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const connectDB = require("./MongoDB/DB/connect");
const AuthMiddleware = require("./middleware/auth");

const GraphQLSchema = require("./GraphQL/schema/index");
const GraphQLResolver = require("./GraphQL/resolvers/index");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(AuthMiddleware);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.all(
  "/graphql",
  createHandler({
    schema: GraphQLSchema,
    rootValue: GraphQLResolver,
    context: (req) => ({ req }),
  })
);

const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const port = process.env.PORT || 4000;
    await connectDB(uri);
    app.listen(port, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT}/graphql`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
start();
