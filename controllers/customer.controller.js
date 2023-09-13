import customerModel from '../models/customer.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const createCustomer = async(req,res,next)=>{
    try {
        if(req.files.avatar){
            req.body.avatar = req.files.avatar[0].destination.replace('./public','') +'/'+req.files.avatar[0].filename
        }
        if(req.body.addressList === ''){
            req.body.addressList = []
        }else{
            req.body.addressList = JSON.parse(req.body.addressList)
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newCustomer = new customerModel({...req.body,password: hash})
        await newCustomer.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const addAddress = async(req,res,next)=>{
    try {
        await customerModel.findOne({_id: req.params.id}).then(data => {
            data.addressList.list.push({...req.body})
             customerModel.findByIdAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
                 res.status(200).json({success: true, message: dt});
             }).catch(err => {
                 res.status(200).json({success: false, message: err});
             })
            }).catch(err => {
     
            })

    } catch (error) {

    }
}

export const updateAddress = async(req,res,next)=>{
    try {
       await customerModel.findOne({_id: req.params.id}).then(data => {
       data.addressList.list[req.body.index] = {...req.body}
        customerModel.findByIdAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
            res.status(200).json({success: true, message: dt});
        }).catch(err => {
            res.status(200).json({success: false, message: err});
        })
       }).catch(err => {

       })

    } catch (error) {
        res.status(200).json({success: false, message: "không lấy được id customer"});

    }
}

export const updateiAddress = async(req,res,next)=>{
    try {
       await customerModel.findOneAndUpdate({_id: req.params.id},{"addressList.index": req.body.index},{new: true}).then(dt => {
        if(dt === null){
            res.status(200).json({success: false, message: "cập nhật index không thành công"})
        }
        res.status(200).json({success: true, message: dt})

       }).catch(err => {
        res.status(200).json({success: false, message: err})
        
       })

    } catch (error) {

    }
}
export const deleteAddress = async(req,res,next) => {
    try {
        await customerModel.findOne({_id: req.params.id}).then(data => {
            // console.log(data)
            data.addressList.list = data.addressList.list.filter((dt,index) => {
                return index != req.body.index
            } )
            if(data.addressList.index == req.body.index){
                data.addressList.index = 0
            }
             customerModel.findOneAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
                 res.status(200).json({success: true, message: dt});
             }).catch(err => {
                 res.status(200).json({success: false, message: err});
             })
            }).catch(err => {
     
            })

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        const data= await customerModel.find({},{createdAt: 0,updatedAt: 0})
        if(data){
            const newData = await Promise.all(data.map(async dt => {
                const listOrder = await dt.listOrder
                return {...dt._doc,listOrder: listOrder}

            }))
            res.status(200).json({success: true, data: newData});

        }
     
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
 

    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
        const data = await customerModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0})
        if(data){
            const listOrder = await data.listOrder
            res.status(200).json({success: true, data: {...data,listOrder:listOrder}});

        }

            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
      

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        if(req.files.avatar){
            req.body.avatar = req.files.avatar[0].destination.replace('./public','') +'/'+req.files.avatar[0].filename
        }
        if(req.body.addressList === ''){
            req.body.addressList = []
        }else{
            req.body.addressList = JSON.parse(req.body.addressList)
        }
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        await customerModel.findByIdAndUpdate(
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
        await customerModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}