import mongoose, { Types } from "mongoose";

const refreshtokenCustomerSchema = mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    codeToken: {
        type: String,
        required: true
    }
},{timestamps: true});

export default mongoose.model('RefreshtokenCustomer',refreshtokenCustomerSchema);