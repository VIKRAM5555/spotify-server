import { MongoClient } from "mongodb";
import express from "express";
import { userroutesignup } from "./Route/signup.js";
import { userroutesigin } from "./Route/signin.js";

import "dotenv/config";
import cors from "cors";
import { tracks } from "./Route/track.js";
import { songImg } from "./Route/song&Img.js";

const uri =
  "mongodb+srv://narashimman54:lakshmi97@cluster0.n63nudw.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected...✔✔✔✔");
    return client;
  } catch (err) {
    console.log("error:", err);
  }
}
export var clients = await main();
app.use("/user", userroutesignup, userroutesigin);

app.use("/track", tracks);
app.use("/song&img", songImg);

const port = process.env.PORT;
app.listen(port, () => console.log(`server runs in ${port}.......✔✔✔`));
