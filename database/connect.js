import { connect } from "mongoose" // Importe la fonction connect de Mongoose pour établir une connexion à MongoDB

// Fonction asynchrone pour établir une connexion à la base de données MongoDB
export async function mongoConnect() {
    try {
        // Établit une connexion à la base de données MongoDB en utilisant l'URI spécifié dans les variables d'environnement
        const db = await connect(process.env.MONGODB_URI)
        
        // Affiche un message dans la console indiquant que la connexion à MongoDB a réussi
        console.log("SUCCESSFULLY CONNECTED TO MONGODB")
        
        // Renvoie l'objet de connexion à la base de données MongoDB
        return db
    } catch (error) {
        // En cas d'erreur lors de la connexion, affiche l'erreur dans la console
        console.error(error)
    }
}
