import {Router} from "express"
import { userController } from "../controllers/userController.js"


const userRouter = Router()

userRouter.post("/auth/register", userController.register)
userRouter.post("/auth/login", userController.login)


export { userRouter }