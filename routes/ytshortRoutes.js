import Express from "express";

import {
  createYoutubeShort,
  deleteYoutubeShort,
  getAllYoutubeShorts,
  updateYoutubeShort,
} from "../controllers/youtubeController.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  

  .post("/createYoutubeShort", createYoutubeShort)
  .get("/getAllYoutubeShorts", getAllYoutubeShorts)
  .put("/updateYoutubeShort/:youtubeShortId", updateYoutubeShort)
  .delete("/deleteYoutubeShort/:youtubeShortId", deleteYoutubeShort)

  