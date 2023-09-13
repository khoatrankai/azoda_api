import discountModel from '../models/discount.model.js'


export const createDiscount = async(req,res,next)=>{
    try {
        const newDiscount = new discountModel({...req.body})
        await newDiscount.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        await discountModel.find({}).populate('productList.product').then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
        await discountModel.findOne({_id:req.params.id}).populate('productList.product').then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        await discountModel.findByIdAndUpdate(
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
        await discountModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}

export const checkPrice = async(req,res,next) =>{
    try{
        await discountModel.findOne({_id: req.params.id}).then(data => {
            if(data.minPrice <= req.body.price){
                res.status(200).json({success: true,message: "Giá đáp ứng điều kiện"})
            }
            res.status(200).json({success: false,message: "Giá không đáp ứng điều kiện"})

        }).catch(err => {

        })
    }catch(err){

    }
}

export const addProduct = async(req,res,next) =>{
    try{
        await discountModel.findOne({_id: req.params.id}).then(data => {
            if(data.productList.filter(dt => dt.product == req.body.product).length > 0){
                res.status(200).json({success: false,message: "sản phẩm đã có"})
            }else{
                data.productList.push({...req.body})
                discountModel.findOneAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
                    res.status(200).json({success: true,message: "thêm sản phẩm thành công"})
                }).catch(err => {
                    res.status(200).json({success: false,message: "thêm sản phẩm không thành công"})

                })
            }

            
        })
    }catch(err){
        res.status(200).json({success: false,message: err})

    }
}

export const deleteProduct = async(req,res,next) =>{
    try{
        await discountModel.findOne({_id: req.params.id}).then(data => {
            data.productList = data.productList.filter(dt => dt.product != req.body.product)
            discountModel.findByIdAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
                res.status(200).json({success: true,message: "xóa sản phẩm thành công"})
            }).catch(err => {
                res.status(200).json({success: false,message: "xóa sản phẩm không thành công"})

            })
        })
    }catch(err){

    }
}