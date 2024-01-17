import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"


export const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}))


// dott env declaration
config({
    path: "./data/config.env",
})

// Middlewares
app.use(express.json())
app.use(cookieParser())



//Using Routes
app.use("/users/api/v1", userRouter)
app.use("/tasks/api/v1", taskRouter)



app.get("/", (req, res) => {
    res.send("Hiiiiiii")
})




app.use(errorMiddleware)