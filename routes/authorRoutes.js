import {Router} from "express"
import { authorController } from "../controllers/authorController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";


const authorRouter = Router()


authorRouter.get('/authors', authorController.index);
authorRouter.get('/authors/:id', authorController.show);
authorRouter.post('/author/new', authMiddleware, authorController.store);



export { authorRouter }