import jwt from "jsonwebtoken";
import CustomerToken from "../models/refreshtoken-customer.model.js";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })


const generateTokens = async (user) => {
    try {
        const payload = { id: user._id, email: user.email };
        const accessToken = jwt.sign(
            payload,
            process.env.R_TOKEN,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.R_TOKEN,
            { expiresIn: "30d" }
        );

        const customerToken = await CustomerToken.findOne({ userId: user._id });
        if (customerToken) await customerToken.remove();

        await new CustomerToken({ customer: user._id, codeToken: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;