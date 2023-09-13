import mongoose from "mongoose";
import productModel from "./product.model.js";

const categorySchema = mongoose.Schema({
  
    name:{
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        default: ""
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
categorySchema.virtual('listProduct').get(async function() {
    const dataCount = await productModel.find({category: this._id});
    if(dataCount){
        return dataCount
    }
});
categorySchema.virtual('listBrand').get(async function() {
    const dataCount = await productModel.aggregate([
        {
            $match:{category: this._id}
        },
        {
        $lookup: {
          from: 'brands', 
          localField: 'brand',
          foreignField: '_id',
          as: 'brand_info'
        }
        
      },
      {
          $group:{
              _id:'$brand',
              brand:{
                $first:'$brand_info'
              }
          }
      } 
]).exec();
    if(dataCount){
        return dataCount
    }
});

export default mongoose.model('Category',categorySchema);