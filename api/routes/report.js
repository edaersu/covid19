const fs = require("fs");

module.exports = (router) => {
  router.get("/daily", async (req, res) => {
    const { date } = req.query;
    const timeline = JSON.parse(fs.readFileSync("dataset/timeline.json"));
    const report =
      timeline[date] ||
      Object.values(timeline)[Object.values(timeline).length - 1];
    return res.json(report);
  });
  router.get("/last", async (req, res) => {
    const timeline = JSON.parse(fs.readFileSync("dataset/timeline.json"));
    const report = Object.values(timeline)[Object.values(timeline).length - 1];
    return res.json(report);
  });
};
