import express from "express"
import { getMyProfile, getUsers, login, logout, register } from "../controllers/user.js";
import { IsAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/all", getUsers)
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)

// *Its a dynamic route whre :id is taken as the params named id , which we can access in url, in this case we are accessing user id . And as its a dynamic route it takes naything as id writtten afterwards. follow fuc in controllers

// spiting different request type in one line 
// router.route("/userid/:id").get(regeisterdId).put(updatedId).delete(deletedId)
router.route("/me").get(IsAuthenticated, getMyProfile)


export default router