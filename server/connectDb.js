import mongoose from "mongoose";

export const connectDb = () => {
  mongoose.connect(
    "mongodb+srv://zarrar:zarrar123@clustergraphqlfcc.8xamb.mongodb.net/graphql-db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  mongoose.connection.once("open", () => {
    console.log("Connected to Db");
  });
};
