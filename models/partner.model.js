import mongoose from "mongoose";

const partnerSchema = mongoose.Schema({
    image: {
        type: String
    },
    name:{
        type: String,
        required: true
    },
    url: {
        type: String
    }
},{timestamps: true});

export default mongoose.model('Partner',partnerSchema);