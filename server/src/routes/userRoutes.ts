import { Router } from "express";
import { postUser,  getUsers, getUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/create", postUser);
router.get("/:cognitoId", getUser);

export default router;