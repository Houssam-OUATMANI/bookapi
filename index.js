// Importation des modules nécessaires
import express from "express" // Importe Express.js pour créer le serveur HTTP
import dotenv from "dotenv" // Importe dotenv pour charger les variables d'environnement depuis un fichier .env
import cors from "cors"
import helmet from "helmet"
import compression from "compression"

import { rateLimit } from 'express-rate-limit'



import {mongoConnect} from "./database/connect.js"
import { userRouter } from "./routes/userRoutes.js"
import { authorRouter } from "./routes/authorRoutes.js"
import { bookRouter } from "./routes/bookRoutes.js"
// Charge les variables d'environnement depuis un fichier .env
dotenv.config()

// Initialise l'application Express
const app = express()
app.use(express.json())
app.use(helmet())
app.use(compression())

/*

const whitelist = ['http://127.0.0.1:5500', 'http://127.0.0.1:8085']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/
app.use(cors())
/* 
     * monsite.com // API
     * monapp.com   // CLIENT APPEL AJAX FETCH => monsite.com
     * monsite.com // partager les données avec tout les origines


*/

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
})


app.use(limiter)
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
