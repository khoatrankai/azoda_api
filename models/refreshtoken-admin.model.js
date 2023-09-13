import mongoose, { Types } from "mongoose";

const refreshtokenAdminSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    codeToken: {
        type: String,
        required: true
    }
},{timestamps: true});

export default mongoose.model('RefreshtokenAdmin',refreshtokenAdminSchema);