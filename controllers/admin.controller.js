import adminModel from '../models/admin.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })


export const createAdmin = async(req,res,next)=>{
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

    }
}

export const addPage = async(req,res,next) => {
    try{
        // const newPage = {pageId: req.body.pageId,func: req.body.func}
        await adminModel.findOne({_id:req.params.id}).then(data=>{
            if(data.pageList.filter(dt => {return dt.pageId == req.body.pageId}).length > 0){
                res.status(200).json({success: false,message: "đã có page"})
                
            }else{
                data.pageList.push({...req.body});
                adminModel.findByIdAndUpdate({_id:req.params.id},{...data},{new: true}).then(data => {
                res.status(200).json({success: true,message: data})
                }).catch(err => {
                    res.status(200).json({success: false,message: err})
                })
            }
            
        })
    }catch{

    }
}


export const deletePage = async(req,res,next) => {
    try{
        await adminModel.findOne({_id: req.params.id}).then(data=>{       
            adminModel.findByIdAndUpdate({_id: req.params.id},{pageList: data.pageList.filter(dt => {return dt.pageId != req.body.pageId})},{new: true}).then(dt =>{
                res.status(200).json({success: true, message: dt})

            }).catch(err => {
                res.status(200).json({success: false, message: err})

            })
        })
    }catch(err){
        
    }
}

export const updateFunc = async(req,res,next) => {
    try{
        await adminModel.findOne({_id: req.params.id}).then(data=>{    
            data.pageList.forEach(dt => {
                if(dt.pageId == req.body.pageId){
                    dt.func = req.body.func
                }
            }) 
            adminModel.findByIdAndUpdate({_id: req.params.id},{pageList: data.pageList},{new: true}).then(newdata => {
                res.status(200).json({success: true, message: newdata})
            }).catch(err =>{
                res.status(200).json({success: false, message: err})

            })
        })
    }catch(err){
        
    }
}

export const getList = async(req,res,next) => {
    try {
       await adminModel.find().populate("pageList.pageId").then(data=>{
         res.status(200).json({success: true, data: data})
       }).catch(err => {
        res.status(200).json({success: false,message: err})
       })

    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
        const listAdmin = await adminModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0})
        .populate("pageList.pageId")
        .exec()
        .then(data =>{
            
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        await adminModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        ).then(data => {
            res.status(200).json({success: true, message: "cập nhật thành công"});
        }).catch(err => {
            res.status(200).json({success: true, message: "cập nhật ko thành công"});
            
        })
    }catch{err => {

    }}
}
export const deleteId = async(req,res,next) =>{
    try{
        await adminModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}