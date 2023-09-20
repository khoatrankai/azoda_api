import pageModel from '../models/page.model.js'
import slideshowModel from '../models/slideshow.model.js'
import categoryModel from '../models/category.model.js'
import brandModel from '../models/brand.model.js'
import partnerModel from '../models/partner.model.js'
import productModel from '../models/product.model.js'



export const createPage = async(req,res,next)=>{
    try {
        const newPage = new pageModel({...req.body})
        await newPage.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getHome = async(req,res,next) => {
    try {
        let dataBrand = await brandModel.find({},{createdAt: 0,updatedAt: 0})
        .populate('topList.product')
        .exec()

        let dataCategory = await categoryModel.find({},{createdAt: 0,updatedAt: 0})
        .populate('topList.product')
        .exec()
        let dataSale = await productModel.find({},{sourceCode: 0}).populate('brand').populate('category').sort({'sale': -1}).limit(10).exec();
        dataSale = dataSale.map(dt => {
            return {...dt._doc,brand: dt.brand.name,category: dt.category.name}
        })
        const dataSlider = await slideshowModel.find({},{createdAt: 0,updatedAt: 0})
        const dataPartner = await partnerModel.find({},{createdAt: 0,updatedAt: 0})
            res.status(200).json({success: true, data:{dataBrand: dataBrand,dataCategory: dataCategory,dataSlider: dataSlider,dataPartner: dataPartner,dataSale: dataSale} });

    } catch (error) {
        res.status(200).json({success: false, message: "Lỗi máy chủ"});
    }
}

export const getList = async(req,res,next) => {
    try {
        const listPage = await pageModel.find({},{createdAt: 0,updatedAt: 0}).then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
        const listPage = await pageModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0}).then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        await pageModel.findByIdAndUpdate(
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
        await pageModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}