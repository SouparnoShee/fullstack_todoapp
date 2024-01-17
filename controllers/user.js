import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";



export const getUsers = async (req, res) => { }

// register 
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User Already Exsists", 404))

        const hashedpassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedpassword })

        sendCookie(user, res, `Registered Successfully, We Welcome You ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");


        if (!user) return next(new ErrorHandler("Invaild User", 404))

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) return next(new ErrorHandler("Invaild User", 404))

        sendCookie(user, res, `Welcome Back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }

}


// Registered Id func
export const getMyProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}


export const logout = (req, res) => {
    res.status(200).cookie(
        "token",
        "",
        {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }
    ).json({
        success: true,
        user: req.user,
    })
}