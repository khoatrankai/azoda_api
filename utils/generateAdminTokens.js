import jwt from "jsonwebtoken";
import AdminToken from "../models/refreshtoken-admin.model.js";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const generateTokens = async (user) => {
    try {
        const payload = { id: user._id, username: user.username };
        const accessToken = jwt.sign(
            payload,
            process.env.R_TOKEN,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.R_TOKEN,
            { expiresIn: "30d" }
        );

        const adminToken = await AdminToken.findOne({ userId: user._id });
        if (adminToken) await adminToken.remove();

        await new AdminToken({ admin: user._id, codeToken: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;