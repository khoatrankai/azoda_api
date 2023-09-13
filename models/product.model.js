
import mongoose, { Mongoose, Types } from "mongoose";


const productSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    avatar:{
        type: String,
        default: ''
    },
    listImage:{
        type:[],
        default: []
    },
    sale: {
        type: Number,
        default: 0
    },
    enable: {
        type: Boolean,
        default: false
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    vat: {
        type: mongoose.Types.ObjectId,
        ref: "Vat",
        required: true
    },
    successfulPurchase:{
        type: Number,
        default: 0
    }
    ,
    sourceCode: {
        type: String,
        default: ""
    },
    urlProduct: {
        type: String,
        default:""
    },
    urlVideo: {
        type: String,
        default:""
    },
    keyWord: {
        type: String,
        default:""
    }
},{timestamps: true});

export default mongoose.model('Product',productSchema);