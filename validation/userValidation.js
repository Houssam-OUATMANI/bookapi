import Joi from "joi" // Importe la bibliothèque Joi pour la validation des données

// Schéma de validation pour l'enregistrement d'un nouvel utilisateur
export const registerUserValidation = Joi.object({ 
    username: Joi.string().min(4).max(30).required(), // Champ 'username' : doit être une chaîne de caractères avec une longueur minimale de 4 et maximale de 30 caractères, et est requis
    email: Joi.string().email().required(), // Champ 'email' : doit être une adresse email valide et est requis
    password: Joi.string().min(4).max(30).required(), // Champ 'password' : doit être une chaîne de caractères avec une longueur minimale de 4 et maximale de 30 caractères, et est requis
})

// Schéma de validation pour la connexion d'un utilisateur existant
export const loginUserValidation = Joi.object({ 
    email: Joi.string().email().required(), // Champ 'email' : doit être une adresse email valide et est requis
    password: Joi.string().min(4).max(30).required(), // Champ 'password' : doit être une chaîne de caractères avec une longueur minimale de 4 et maximale de 30 caractères, et est requis
})
