import express from "express";

const router = express.Router();

import {
  getAllFolders,
  createFolder,
  deleteFolder,
  getSingleFolder,
  moveFolder,
} from "../controllers/FolderController";

import authenticate from "../middleware/Authentication";

router.use(authenticate);

router.get("/", getAllFolders);
router.get("/:folderId", getSingleFolder);

router.post("/", createFolder);
router.delete("/delete", deleteFolder);
router.patch("/move", moveFolder);

export default router;
