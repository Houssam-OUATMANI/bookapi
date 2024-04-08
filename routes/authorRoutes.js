import {Router} from "express"
import { authorController } from "../controllers/authorController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";


const authorRouter = Router()


authorRouter.post('/author/new', authMiddleware, authorController.store);



export { authorRouter }