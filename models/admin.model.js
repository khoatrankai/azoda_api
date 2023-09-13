import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String    
    },
    pageList: {
        type: [
            {
                pageId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Page"
                },
                func: {
                    type: Number,
                    enum: [0,1,2,3,4,5,6,7],
                    default:0
                }
            }
        ]
    }
},{timestamps: true});

export default mongoose.model('Admin',adminSchema);