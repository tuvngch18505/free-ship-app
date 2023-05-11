import express from "express";
const router = express.Router();
import {
  createBooster,
  getAllBoosters,
  getBoosterById,
  updateBooster,
  deleteBooster,
} from "./controllers/boosterController.js";

// create a new booster
router.post("/boosters/", createBooster);

// read all booster
router.get("/boosters/", getAllBoosters);

//read booster by id
router.get("/boosters/:id", getBoosterById);

//Update booster by id

router.patch("/boosters/:id", updateBooster);

router.put("/boosters/:id", updateBooster);

//Delete booster
router.delete("/boosters/:id", deleteBooster);

export default router;
