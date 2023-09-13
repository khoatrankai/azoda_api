import slideShowModel from "../models/slideshow.model.js";

export const createSlideshow = async(req,res,next)=>{
    try {
        if(req.files.image){
            req.body.image = req.files.image[0].destination.replace('./public','') +'/'+req.files.image[0].filename
        }
        const newSlideshow = new slideShowModel({...req.body})
        await newSlideshow.save().then(savedDate =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        const listSlider = await slideShowModel.find({},{createdAt: 0,updatedAt: 0}).then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}


export const getId = async(req,res,next) => {
    try {
        const listSlider = await slideShowModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0}).then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        if(req.files.image){
            req.body.image = req.files.image[0].destination.replace('./public','') +'/'+req.files.image[0].filename
        }
        await slideShowModel.findByIdAndUpdate(
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
        await slideShowModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "Slide xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "Slide xóa không thành công"})

        })
    }catch(err){

    }
}