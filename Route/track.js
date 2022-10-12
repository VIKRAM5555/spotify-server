import { clients } from "../index.js";
import express from "express";
var trackStorage = express.Router();
trackStorage.get("/", async function (req, res) {
  res.send(
    await clients.db("spotify").collection("songDetail").find({}).toArray()
  );
});

trackStorage.post("/", async function (req, res) {
  var data = req.body;

  res.send(
    await clients.db("spotify").collection("songDetail").insertMany(data)
  );
});

export var tracks = trackStorage;
