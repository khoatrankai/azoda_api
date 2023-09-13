import orderModel from '../models/order.model.js'
import productModel from '../models/product.model.js'
const enumStatus = orderModel.schema.path('status').enumValues;

export const createOrder = async(req,res,next)=>{
    try {
        req.body.status = enumStatus[0]
        const newOrder = new orderModel({...req.body})
        await newOrder.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getListOrderDate = async(req,res,next)=>{
    try {
        const data = await orderModel.find({}).sort({'createdAt': -1}).limit(5)
        if(!data){
            res.status(403).json({success: false,message: "không có dữ liệu"})
        }
        res.status(200).json({success:true, data: data})

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        await orderModel.find({})
        .populate('productList.product')
        .populate('customerInfo.customer')
        .exec()
        .then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
        await orderModel.findOne({_id:req.params.id})
        .populate('productList.product')
        .populate('customerInfo.customer')
        .exec()
        .then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}

export const getOrderCustomerId = async(req,res,next) => {
    try {
        await orderModel.findOne({'customerInfo.customer': req.params.id})
        .populate('productList.product')
        .populate('customerInfo.customer')
        .exec()
        .then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}

export const statusEnum = async(req,res,next) => {
    try{
        const status = orderModel.schema.path('status').enumValues;
        if(!status){
            res.status(200).json({success: false,message: "khong loi"})
        }
        res.status(200).json({success: true,data: status})
    }catch(err){

    }
}

export const updateId = async(req,res,next) => {
    try{
        
        // const statusUp = req.body.status
        // const enumStatus = orderModel.schema.path('status').enumValues;
        // req.body.status = enumStatus[req.body.status]       
        await orderModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        ).then(data => {
            if(req.body.status === enumStatus[3]){
                data.productList.forEach(dataa => {
                    productModel.findOne({_id: dataa.product}).then(
                        dt => {
                            const updateSuccesspur = dt.successfulPurchase + dataa.quantity
    
                            productModel.findByIdAndUpdate({_id: dataa.product},{successfulPurchase: updateSuccesspur},{new: true}).then(dtt => {
                                console.log(dtt)
                            }).catch(err => {
                                console.log(err)
                            });
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    
                })
            }
            res.status(200).json({success: true, message: "cập nhật thành công"});
        }).catch(err => {
            res.status(200).json({success: true, message: "cập nhật ko thành công"});
            
        })
    }catch{err => {

    }}
}
export const deleteId = async(req,res,next) =>{
    try{
        await orderModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}

export const updateStatus = async(req,res,next) =>{
    try{
        // req.body.status = enumStatus[req.body.status]
        await orderModel.findByIdAndUpdate({_id: req.params.id},{status: req.body.status},{new: true}).then(data => {
            res.status(200).json({success: true,message: "cập nhật trạng thái "+req.body.status + " thành công"})
        }).catch(err =>{
            res.status(200).json({success: false,message: "cập nhật trạng thái "+req.body.status + " không thành công"})
        })
    }catch(err){

    }
}