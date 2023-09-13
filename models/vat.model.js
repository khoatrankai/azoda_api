import mongoose from "mongoose";
import productModel from "./product.model.js";

const vat = mongoose.Schema({
    percent: {
        type: Number,
        required: true,
        unique: true
    }
},{timestamps: true});
vat.virtual('listProduct').get(async function() {
    const dataCount = await productModel.find({vat: this._id});
    if(dataCount){
        return dataCount
    }
});
export default mongoose.model('Vat',vat);