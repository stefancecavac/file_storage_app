import exproess from "express";

const router = exproess.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/UserController";
import authenticate from "../middleware/Authentication";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.use(authenticate);
router.get("/", getCurrentUser);
export default router;
