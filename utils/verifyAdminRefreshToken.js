import adminToken from "../models/refreshtoken-admin.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const verifyAdminRefreshToken = (refreshToken) => {
    const privateKey = process.env.R_TOKEN;
    return new Promise((resolve, reject) => {
        
        adminToken.findOne({ codeToken: refreshToken }).then(data => {
                jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err)
                    return reject({ success: false, message: "Invalid refresh token1" });
                resolve({
                    tokenDetails,
                    succes: true,
                    message: "Valid refresh token",
                });
            });
        }).catch(err => {
            return reject({ success: false, message: "Invalid refresh token2" });
        })
    });
};
export default verifyAdminRefreshToken;