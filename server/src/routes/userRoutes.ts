import { Router } from "express";
import { /* createUser,  */getUsers/* , updateUserStatus */ } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
/* router.post("/", createUser); */
/* router.patch("/:userId/status", updateUserStatus); */

export default router;