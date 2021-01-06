const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const ApiError = require("./error/ApiError");
const runScript = require("./utils/runscript");

const app = express();
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));
// Add `/api` routes
const router = express.Router();
routes.forEach((routeFn) => routeFn(router));
app.use("/api", router);

// Generic error handler
app.use((err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    console.error(err);
  }
  if (/\w+ validation failed: \w+: /i.test(err.message)) {
    err.message = err.message.replace(/\w+ validation failed: \w+: /i, "");
  }
  res.status(err.status || 500).json({
    error: err.message || "Unexpected error, please try again later",
    code: err.code,
  });
});

// Run the API on `port`
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  return port >= 0 ? port : false;
};
const port = normalizePort(process.env.PORT || 3001);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`API listening on port: ${port}`);
  setInterval(() => {
    runScript("./utils/update.js", (err) => {
      if (err) throw err;
      console.log("update done!");
    });
  }, [5e3]);
});

// graceful shutdown
process.on("SIGINT", () => {
  server.close((_err1) => {});
});

module.exports = app;
