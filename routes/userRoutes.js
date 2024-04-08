import {Router} from "express"
import { userController } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"


const userRouter = Router()

userRouter.post("/auth/register", userController.register)
userRouter.post("/auth/login", userController.login)



userRouter.get('/protected', authMiddleware, (req, res) => {
    return res.json("Route protégé")
})


export { userRouter }