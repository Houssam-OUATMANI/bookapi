import { Schema, model } from "mongoose" // Importe la classe Schema et la fonction model de Mongoose pour définir un schéma de données et créer un modèle

// Définition du schéma de données pour un utilisateur
const userSchema = new Schema({
    username: String, // Champ 'username' de type String pour stocker le nom d'utilisateur de l'utilisateur
    email: String, // Champ 'email' de type String pour stocker l'adresse email de l'utilisateur
    password: String // Champ 'password' de type String pour stocker le mot de passe de l'utilisateur
}, { timestamps: true }) // Option pour ajouter des champs de date de création et de mise à jour automatiques

// Création d'un modèle basé sur le schéma de données défini
export const userModel = model("User", userSchema) // Le modèle est nommé "User" et est basé sur le schéma userSchema
