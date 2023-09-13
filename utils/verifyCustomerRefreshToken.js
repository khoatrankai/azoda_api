import customerToken from "../models/refreshtoken-customer.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const verifyCustomerRefreshToken = (refreshToken) => {
    const privateKey = process.env.R_TOKEN;
    return new Promise((resolve, reject) => {
        
        customerToken.findOne({ codeToken: refreshToken }).then(data => {
                jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err)
                    return reject({ success: false, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    succes: true,
                    message: "Valid refresh token",
                });
            });
        }).catch(err => {
            return reject({ success: false, message: "Invalid refresh token" });
        })
    });
};
export default verifyCustomerRefreshToken;