import {Router} from "express"
import { bookController } from "../controllers/bookController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import multer from "../middlewares/multer.js"


const bookRouter = Router()


bookRouter.get('/books', bookController.index);
bookRouter.get('/books/:id', bookController.show);

// *** multer 
bookRouter.post('/books/new', authMiddleware, multer, bookController.store);



export { bookRouter }