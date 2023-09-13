
import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ["chờ xác nhận", "chuẩn bị hàng", "đang vận chuyển", "đã giao","từ chối"],
        default: "chờ xác nhận"
    },
    orderCode:{
        type: String,
        required: true
    }
    ,
    productList:{
        type: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0
                },
                price: {
                    type: Number,
                    default: 0
                }
                ,
                productCode:{
                    type: String,
                    required: true
                }
            }
        ]
    },
    customerInfo: {
        type: {
            customer:{
                type: mongoose.Types.ObjectId,
                ref: "Customer",
                required: true
            },
            address: {
                type: Number,
                default: 0
            }
        }
    },
    payment: {
        type: {
            beforeTotal: {
                type: Number,
                default: 0
            },
            afterTotal:{
                type: Number,
                default: 0
            },
            discount: {
                type: mongoose.Types.ObjectId,
                ref: "Discount"
            },
            vat: {
                type: Boolean,
                default: false
            }
        }
    },
    companyInvoice:{
        type: {
            name: {
                type: String,
                default: ""
            },
            address: {
                type: String,
                default: ""
            },
            taxCode: {
                type: String,
                default: ""
            },
            email: {
                type: String,
                default: ""
            },
            other: {
                type: String,
                default: ""
            }
        }
    }
},{timestamps: true});

export default mongoose.model('Order',orderSchema);