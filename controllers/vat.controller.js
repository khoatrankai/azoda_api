import vatModel from "../models/vat.model.js";

export const createVat = async(req,res,next)=>{
    try {
        const newVat = new vatModel({...req.body})
        await newVat.save().then(savedDate =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        const listVat = await vatModel.find({},{createdAt: 0,updatedAt: 0})
           if(listVat){
                const newListVat = await Promise.all(listVat.map(async dt => {
                    const listProduct = await dt.listProduct
                    return {...dt._doc,listProduct: listProduct}

                }))
                res.status(200).json({success: true, data: newListVat});

           }

            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
   

    } catch (error) {

    }
}


export const getId = async(req,res,next) => {
    try {
        const listVat = await vatModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0})
           if(listVat){
                const listProduct = await listVat.listProduct
                res.status(200).json({success: true, data: {...listVat,listProduct: listProduct}});

           }

            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
   

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        await vatModel.findByIdAndUpdate(
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
        await vatModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "Slide xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "Slide xóa không thành công"})

        })
    }catch(err){

    }
}