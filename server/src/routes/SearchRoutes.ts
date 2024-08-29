import express from "express";

const router = express.Router();

import {
  getAllSearchFolders,
  getAllSearchFiles,
} from "../controllers/SearchController";
import authenticate from "../middleware/Authentication";

router.use(authenticate);
router.get("/folders", getAllSearchFolders);
router.get("/files", getAllSearchFiles);

export default router;
