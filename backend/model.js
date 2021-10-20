import  Mongoose  from "mongoose";


const paperSchema = new Mongoose.Schema({
    name: String,
    imf : Number,
    authorType:String,
    file_data: {},
    date:{
        type:Date,
        default:Date.now()
    }
})
const paper = Mongoose.model('paper',paperSchema)

export default paper