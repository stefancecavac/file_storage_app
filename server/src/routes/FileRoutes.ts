import express from "express";

const router = express.Router();

import {
  getAllFiles,
  uploadFile,
  deleteFile,
  insertFileIntoFolder,
} from "../controllers/FileController";
import upload from "../util/FileUpload";
import authenticate from "../middleware/Authentication";

router.use(authenticate);
router.patch("/move", insertFileIntoFolder);
router.get("/", getAllFiles);
router.post("/", upload.single("file"), uploadFile);
router.delete("/delete", deleteFile);

export default router;
