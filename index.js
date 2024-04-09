// Importation des modules nécessaires
import express from "express" // Importe Express.js pour créer le serveur HTTP
import dotenv from "dotenv" // Importe dotenv pour charger les variables d'environnement depuis un fichier .env
import {mongoConnect} from "./database/connect.js"
import { userRouter } from "./routes/userRoutes.js"
import { authorRouter } from "./routes/authorRoutes.js"
import { bookRouter } from "./routes/bookRoutes.js"
// Charge les variables d'environnement depuis un fichier .env
dotenv.config()

// Initialise l'application Express
const app = express()
app.use(express.json())

app.use("/api/v1" ,userRouter)
app.use("/api/v1" ,authorRouter)
app.use("/api/v1" ,bookRouter)

// Définit le port sur lequel le serveur va écouter, utilise le port spécifié dans les variables d'environnement s'il est défini, sinon utilise le port 3000
const port = process.env.PORT || 3000

// Lance le serveur pour écouter les connexions entrantes
app.listen(port, async () => {
    await mongoConnect()
    console.log(`SERVER RUNNING ON PORT ${port}`) // Affiche un message dans la console lorsque le serveur démarre avec succès
})
