import express from "express"
import { bookModel } from "../models/bookSchema.js"

class BookController {

    /**
    * Gère la création d'un nouvel utilisateur.
    * 
    * @param {express.Request} req - La requête HTTP entrante.
    * @param {express.Response} res - La réponse HTTP sortante.
    */
    async store(req, res) {
       const body = req.body
       const file = req.file


       console.log(body)
       console.log(file)
    }


    /**
  * .
  * 
  * @param {express.Request} req - La requête HTTP entrante.
  * @param {express.Response} res - La réponse HTTP sortante.
  */

    async index(req, res) {
        const books = await bookModel
            .find()
            .populate('authorId')
            .populate('userId')

        return res.status(200).json(books)

    }

    /**
     * Gère la création d'un nouvel utilisateur.
     * 
     * @param {express.Request} req - La requête HTTP entrante.
     * @param {express.Response} res - La réponse HTTP sortante.
     */

    async show(req, res) {
        const id = req.params.id
        const book = await bookModel.findById(id)
        if (!book) return res.status(404).json({ message: "Book Not Found" })
        return res.status(200).json(book)
    }

    //  TODO UPDATE DELETE




}



export const bookController = new BookController()