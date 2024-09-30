import mongoose from "mongoose";

const assistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true,  
    },
    accept: { 
        type: Boolean, 
    }
},)

const assistModel = mongoose.models.assist || mongoose.model('assist',assistSchema);
export default assistModel