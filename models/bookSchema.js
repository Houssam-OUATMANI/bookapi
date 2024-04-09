import { Schema, model } from "mongoose"

const bookSchema = new Schema({
    title: String,
    publishedYear: String,
    isbn: String,
    description : String,
    cover : String,
    ratings : [
        {
            userId : {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            rating :  {
                type : Number,
                min : 0,
                max : 10
            }
        }
    ],
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},
    { timestamps: true }
)

export const bookModel = model("Book", bookSchema) 