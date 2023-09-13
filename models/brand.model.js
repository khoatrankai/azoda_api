import mongoose from "mongoose";
import productModel from "./product.model.js";

const brandSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    url: {
        type: String
    },
    topList: {
        type: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product"
                }
            }
        ],
        default: []
    }
},{timestamps: true});
brandSchema.virtual('listProduct').get(async function() {
    const dataCount = await productModel.find({brand: this._id});
    if(dataCount){
        return dataCount
    }
});
brandSchema.virtual('listCategory').get(async function() {
    const dataCount = await productModel.aggregate([
        {
            $match:{brand: this._id}
        },
        {
        $lookup: {
          from: 'categories', 
          localField: 'category',
          foreignField: '_id',
          as: 'category_info'
        }
        
      },
      {
          $group:{
              _id:'$category',
              category:{
                $first: '$category_info'
              }
          }
      } 
]).exec();
    if(dataCount){
        return dataCount
    }
});

export default mongoose.model('Brand',brandSchema);