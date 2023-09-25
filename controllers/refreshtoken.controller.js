import refreshtokenCustomerModel from '../models/refreshtoken-customer.model.js'
import refreshtokenAdminModel from '../models/refreshtoken-admin.model.js'
import customerModel from '../models/customer.model.js'
import adminModel from '../models/admin.model.js'
import verifyCustomerRefreshToken from '../utils/verifyCustomerRefreshToken.js'
import jwt from 'jsonwebtoken'
import verifyAdminRefreshToken from '../utils/verifyAdminRefreshToken.js'
import bcrypt from 'bcrypt'
import generateCustomerTokens from '../utils/generateCustomerTokens.js'
import generateAdminTokens from '../utils/generateAdminTokens.js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })



export const signUpCustomer = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newCustomer = new customerModel({...req.body,password: hash})
        await newCustomer.save().then(savedData =>{
            res.status(200).json({success: true, message: {email: savedData.email,password: req.body.password}});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {
        res.status(200).json({success: false, message: 'Lỗi máy chủ'});
    }
}

export const signUpAdmin = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newAdmin = new adminModel({...req.body,password: hash})
        await newAdmin.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })
       
         

    } catch (error) {
        res.status(200).json({success: false, message: 'Lỗi máy chủ'});
    }
}

export const logInCustomer = async(req,res,next) => {
    try {
        
        // console.log(req.body)
        const user = await customerModel.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(200)
                .json({ success: false, message: "Invalid email or password" });

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifiedPassword)
            return res
                .status(200)
                .json({ success: false, message: "Invalid email or password" });

        const { accessToken, refreshToken } = await generateCustomerTokens(user);
        // console.log(accessToken, refreshToken)

        
        res.cookie("refreshToken",refreshToken,{
            httpOnly: true, // chỉ có thể truy cập bằng HTTP
            secure: false, // chỉ sử dụng HTTPS nếu đặt là true
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        res.cookie("accessToken",accessToken,{
            httpOnly: true, // chỉ có thể truy cập bằng HTTP
            secure: false, // chỉ sử dụng HTTPS nếu đặt là true
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        res.status(200).json({
            success: true,
            idUser: user._id,
            accessToken,
            refreshToken,
            userData: {
                _id: user._id,
                avatar: user.avatar,
                email: user.email,
                name: user.name
            },
            message: "Logged in sucessfully"
        });
    } catch (err) {
        res.status(200).json({ success: false, message: "Internal Server Error" });
    }
}

export const accessLoginCustomer = async(req,res,next) => {
    try{
        verifyCustomerRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, email: tokenDetails.email,avatar: tokenDetails.avatar,name: tokenDetails.name };
            const accessToken = jwt.sign(
                payload,
                process.env.R_TOKEN,
                { expiresIn: "5m" }
            );
            res.status(200).json({
                success: true,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => res.status(401).json({success: false,message: err}));
    }catch(err){
        res.status(400).json({success: false,message: err})
    }
}

export const getUser = async(req,res,next) => {
    try{
       res.status(200).json({success: true,data: req.decoded})
    }catch(err){
        res.status(400).json({success: false,message: err})
    }
}

export const logOutCustomer = async(req,res,next) => {
    try {
        await refreshtokenCustomerModel.findOneAndDelete({ codeToken: req.cookies.refreshToken }).then(data => {
            res.clearCookie('refreshToken');
            res.status(200).json({ success: true, message: "Logged Out Sucessfully" });
        }).catch(err => {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const logInAdmin = async(req,res,next) => {
    try {
        const user = await adminModel.findOne({ username: req.body.username });
        console.log(user)
        if (!user)
            return res
                .status(200)
                .json({ success: false, message: "Invalid username or password" });

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifiedPassword)
            return res
                .status(200)
                .json({ success: false, message: "Invalid username or password" });

        const { accessToken, refreshToken } = await generateAdminTokens(user);
        // console.log(accessToken, refreshToken)

        
        res.cookie("refreshToken",refreshToken,{
            httpOnly: true, // chỉ có thể truy cập bằng HTTP
            secure: false, // chỉ sử dụng HTTPS nếu đặt là true
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        res.cookie("accessToken",accessToken,{
            httpOnly: true, // chỉ có thể truy cập bằng HTTP
            secure: false, // chỉ sử dụng HTTPS nếu đặt là true
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            userData: {
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                name: user.name
            },
            message: "Logged in sucessfully"
        });
    } catch (err) {
        res.status(200).json({ success: false, message: "Internal Server Error" });
    }
}

export const accessLoginAdmin = async(req,res,next) => {
    try{
        verifyAdminRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, username: tokenDetails.username,avatar: tokenDetails.avatar,name: tokenDetails.name };
            const accessToken = jwt.sign(
                payload,
                process.env.R_TOKEN,
                { expiresIn: "5m" }
            );
            res.status(200).json({
                success: true,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => res.status(200).json({success: false,message: err}));
    }catch(err){
        res.status(200).json({success: false,message: err})
    }
}

export const logOutAdmin = async(req,res,next) => {
    try {
        await refreshtokenAdminModel.findOneAndDelete({ codeToken: req.cookies.refreshToken }).then(data => {
            res.clearCookie('refreshToken');
            res.status(200).json({ success: true, message: "Logged Out Sucessfully" });
        }).catch(err => {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


