import * as express from "express";
import {
  authenticate,
  showProfile,
  sign,
} from "../controllers/usersController";
import { authorize } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate);
router.route("/profile").get(authorize, showProfile);
router.post("/", sign);

export { router };
