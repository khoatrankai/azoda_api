import mongoose from "mongoose";

const slideshowSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    url: {
        type: String,
        default: "/"
    }
},{timestamps: true});

export default mongoose.model('Slideshow',slideshowSchema);