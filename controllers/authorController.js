import express from "express"
import { authorModel } from "../models/authorSchema.js"
import { storeAuthorValidation } from "../validation/authorValidation.js"

class AuthorController {

    /**
    * Gère la création d'un nouvel utilisateur.
    * 
    * @param {express.Request} req - La requête HTTP entrante.
    * @param {express.Response} res - La réponse HTTP sortante.
    */
    async store(req, res) {
        const { error, value } = storeAuthorValidation.validate(req.body)
        if (error) return res.status(422).json(error)
        // TODO VALIDER LES DONNEES
        await authorModel.create({
            biography: value.biography,
            firstname: value.firstname,
            dob: value.dob,
            biography: value.biography,
            lastname: value.lastname,
            nationality : value.nationality,
            user : value.user
        })

        return res.status(201).json({ message: "Author added!!" })
    }


    /**
  * .
  * 
  * @param {express.Request} req - La requête HTTP entrante.
  * @param {express.Response} res - La réponse HTTP sortante.
  */

    async index(req, res) {
        const authors = await authorModel.find()
        return res.status(200).json(authors)

    }

    /**
     * Gère la création d'un nouvel utilisateur.
     * 
     * @param {express.Request} req - La requête HTTP entrante.
     * @param {express.Response} res - La réponse HTTP sortante.
     */

    async show(req, res) {
        const id = req.params.id
        const author = await authorModel.findById(id)
        if (!author) return res.status(404).json({ message: "Author Not Found" })
        return res.status(200).json(author)
        
    }

    //  TODO UPDATE DELETE

}



export const authorController = new AuthorController()