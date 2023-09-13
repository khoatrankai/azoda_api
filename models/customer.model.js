
import mongoose from "mongoose";
import orderModel from "./order.model.js";

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: "",
        unique: true    
    },
    gender: {
        type: Boolean,
        default: false    
    },
    avatar: {
        type: String,
        default: "hinh"
    }
    ,
    addressList: 
    
    {
        type: [
                    {

                        name:{
                            type: String,
                            default: ""
                        },
                        phoneNumber:{
                            type: String,
                            default: ""
                        },
                        address: {
                            type: String,
                            default: ""
                        },
                        addressDefault: {
                            type: Boolean,
                            default: false
                        }
                    }
                ]
            
        ,
        default: []
    },
    
},{timestamps: true});
customerSchema.virtual('listOrder').get(async function() {
    const dataCount = await orderModel.find({'customerInfo.customer': this._id});
    if(dataCount){
        return dataCount
    }
});

export default mongoose.model('Customer',customerSchema);