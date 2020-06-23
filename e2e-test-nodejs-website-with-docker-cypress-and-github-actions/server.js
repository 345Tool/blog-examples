import express from "express";
import * as http from "http";
import * as path from "path";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/submit", (req, res) => {
  res.end("submit success!");
});

const server = http.createServer(app);

server.listen("4040");
