import express from "express"
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js"
import { userModel } from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UserController {

    /**
     * Gère la création d'un nouvel utilisateur.
     * 
     * @param {express.Request} req - La requête HTTP entrante.
     * @param {express.Response} res - La réponse HTTP sortante.
     */
    async register(req, res) {
        // Validation des données d'entrée pour l'enregistrement d'un nouvel utilisateur
        const { error, value } = registerUserValidation.validate(req.body)
        // Si des erreurs de validation sont présentes, renvoyer un code d'état 422 (Unprocessable Entity) avec les erreurs
        if (error) return res.status(422).json(error)
        
        // Vérifie si un utilisateur avec l'adresse email fournie existe déjà dans la base de données
        const user = await userModel.findOne({ email: value.email })
        // Si un utilisateur est trouvé, renvoyer un code d'état 409 (Conflict) avec un message indiquant que le compte existe déjà
        if (user) return res.status(409).json({ message: "Account already exists" })
        
        // Hashage du mot de passe avant de le stocker en base de données
        const hash = await bcrypt.hash(value.password, process.env.BCRYPT_SALT)
        
        // Création d'un nouvel utilisateur avec les données fournies
        await userModel.create({
            username: value.username,
            email: value.email,
            password: hash
        })
        
        // Renvoie un code d'état 201 (Created) avec un message indiquant que le compte a été créé avec succès
        return res.status(201).json({ message: "Account successfully created!" })
    }

    /**
     * Gère l'authentification d'un utilisateur existant.
     * 
     * @param {express.Request} req - La requête HTTP entrante.
     * @param {express.Response} res - La réponse HTTP sortante.
     */
    async login(req, res) {
        // Validation des données d'entrée pour l'authentification de l'utilisateur
        const { error, value } = loginUserValidation.validate(req.body)
        // Si des erreurs de validation sont présentes, renvoyer un code d'état 422 (Unprocessable Entity) avec les erreurs
        if (error) return res.status(422).json(error)
        
        // Recherche de l'utilisateur dans la base de données en utilisant l'adresse email fournie
        const user = await userModel.findOne({ email: value.email })
        // Si aucun utilisateur n'est trouvé, renvoyer un code d'état 404 (Not Found) avec un message indiquant que le compte n'a pas été trouvé
        if (!user) return res.status(404).json({ message: `Account not found` })
        
        // Vérification de la correspondance du mot de passe fourni avec le mot de passe haché stocké en base de données
        const match = await bcrypt.compare(value.password, user.password)
        // Si les mots de passe ne correspondent pas, renvoyer un code d'état 401 (Unauthorized) avec un message indiquant des informations d'identification invalides
        if (!match) return res.status(401).json({ message: "Invalid Credentials" })

        // Préparation des données à signer dans le JWT (JSON Web Token)
        const payload = {
            sub: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        }
        
        // Création du JWT en utilisant la clé secrète et la durée de validité spécifiées dans les variables d'environnement
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
        
        // Renvoie un code d'état 200 (OK) avec un message indiquant que l'authentification a réussi et le jeton JWT généré
        return res.status(200).json({
            message: "Successfully authenticated",
            data: {
                token: jwtToken,
                date: Date.now()
            }
        })
    }
}

// Exporte une instance de UserController pour être utilisée dans d'autres fichiers
export const userController = new UserController()
