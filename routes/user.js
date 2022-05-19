import { Router } from 'express';
import { getAllUsers, getUser } from '../controller/userController.js';
const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;