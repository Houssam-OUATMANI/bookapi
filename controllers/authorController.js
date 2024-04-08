import express from "express"
import { authorModel } from "../models/authorSchema.js"

class AuthorController  {

     /**
     * Gère la création d'un nouvel utilisateur.
     * 
     * @param {express.Request} req - La requête HTTP entrante.
     * @param {express.Response} res - La réponse HTTP sortante.
     */
    async store(req, res) {
        const {firstname, lastname, dob, biography, nationality, _id} = req.body
        await authorModel.create({
            biography, firstname, lastname, nationality, dob , user : _id
        })

        return res.status(201).json({message : "Author added!!"})

    }
}



export const authorController = new AuthorController()