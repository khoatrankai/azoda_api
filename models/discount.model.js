
import mongoose from "mongoose";

const discountSchema = mongoose.Schema({
    price: {
        type: Number,   
        default: 0
    },
    minPrice:{
        type: Number,   
        default: 0
    },
    typeDis: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,   
        default: ""
    },
    startAt: {
        type: Date,
        default: Date.now()
    },
    endAt:{
        type: Date,
        default: Date.now()
    },
    productList:{
        type: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product"
                }
            }
        ]
    }
},{timestamps: true});

export default mongoose.model('Discount',discountSchema);