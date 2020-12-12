import * as express from "express"
import {
  authenticate,
  getProfile,
  sign,
  updateProfile,
} from "../controllers/usersController"
import { authorize } from "../middleware/auth"
const router = express.Router()

router.post("/login", authenticate)
router
  .route("/profile")
  .get(authorize, getProfile)
  .put(authorize, updateProfile)
router.post("/", sign)

export { router }
