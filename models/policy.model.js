import mongoose from "mongoose";

const policySchema = mongoose.Schema({
    sourceCode: {
        type: String,
        default: ""
    },
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

export default mongoose.model('Policy',policySchema);