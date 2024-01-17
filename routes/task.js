import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { IsAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/newtask", IsAuthenticated, newTask)

router.get("/mytask", IsAuthenticated, getMyTask)

router.route("/:id").put(IsAuthenticated, updateTask).delete(IsAuthenticated, deleteTask)



export default router;