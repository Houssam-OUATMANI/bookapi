import Joi from "joi" // Importe la bibliothèque Joi pour la validation des données

// Schéma de validation pour l'enregistrement d'un nouvel utilisateur
export const storeAuthorValidation = Joi.object({
    firstanme: Joi.string().min(4).max(30).required(), // Champ 'username' : doit être une chaîne de caractères avec une longueur minimale de 4 et maximale de 30 caractères, et est requis
    lastname: Joi.string().required(), // Champ 'email' : doit être une adresse email valide et est requis
    nationality: Joi.string().min(4).max(30).required(),
    biography: Joi.string().required(),
    dob: Joi.date(),
    user: Joi.string().required()
})