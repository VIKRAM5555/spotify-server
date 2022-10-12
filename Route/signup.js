import { clients } from "../index.js";
import express from "express";
import bcrypt from "bcrypt";
import { auth } from "../Middleware/auth.js";

var apps = express.Router();

async function hashpwd(pwd) {
  var salt = await bcrypt.genSalt(10);
  var hashpwd = await bcrypt.hash(pwd, salt);
  return hashpwd;
}

apps.get("/", async function (req, res) {
  res.send(await clients.db("spotify").collection("user").find({}).toArray());
});
apps.post("/signup", async function (req, res) {
  var { name, password } = req.body;
  var pwd = await hashpwd(password);
  var data = { name: name, password: pwd };
  var userexist = await clients
    .db("spotify")
    .collection("user")
    .findOne({ name: name });
  console.log(data);
  if (!userexist) {
    res.send(await clients.db("spotify").collection("user").insertOne(data));
  } else {
    res.status(404).send({ msg: "already exist" });
  }
});

export var userroutesignup = apps;
