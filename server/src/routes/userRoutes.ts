import { Router } from "express";
import { postUser,  getUsers/* , updateUserStatus */ } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
/* router.patch("/:userId/status", updateUserStatus); */

export default router;