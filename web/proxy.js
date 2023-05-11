import express from "express";
import Booster from "./models/booster.js";
const router = express.Router();

// read all booster
router.get("/config", async (req, res, next) => {
  const bt = await Booster.findOne({ status: 'Published'})
  
  return res.send(bt);
});

export default router;