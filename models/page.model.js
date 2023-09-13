import mongoose from "mongoose";

const pageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});

export default mongoose.model('Page',pageSchema);