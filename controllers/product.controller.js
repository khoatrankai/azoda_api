import productModel from '../models/product.model.js'
import brandModel from '../models/brand.model.js'




export const filterProduct = async(req,res,next) => {
    if(!req.body.brand){
        req.body.brand = []
    }
    if(!req.body.category){
        req.body.category = []
    }
    const arraybrand = req.body.brand
    const arraycategory = req.body.category
    let typeFilter = {}
    if(!req.body.min){
        req.body.min = 0
    }
    if(!req.body.max){
        req.body.max = Infinity
    }
    switch(req.body.typeFilter)
    {
        case 1:
            typeFilter = {'price':1}
            break;
        case 2:
            typeFilter = {'price':-1}
            break;  
        case 3:
            typeFilter = {'name': 1}
            break;
        case 4:
            typeFilter = {'name': -1}
            break;
        case 5:
            typeFilter = {'createdAt': -1}
            break;
        case 6:
            typeFilter = {'successfulPurchase': -1}
        default:
            break;
            
    }
    let dataFilter = await productModel.find({price: {$gte: req.body.min,$lte: req.body.max}}).sort(typeFilter)
    if(arraybrand.length > 0 && arraycategory.length > 0){
        dataFilter = await productModel.find({price: {$gte: req.body.min,$lte: req.body.max},brand: {$in: req.body.brand},category: {$in: req.body.category}}).sort(typeFilter)
    }
    if(arraycategory.length > 0 && arraybrand.length == 0){

        dataFilter = await productModel.find({price: {$gte: req.body.min,$lte: req.body.max},category: {$in: req.body.category}}).sort(typeFilter)
    }
    if(arraybrand.length > 0 && arraycategory.length == 0){
        dataFilter = await productModel.find({price: {$gte: req.body.min,$lte: req.body.max},brand: {$in: req.body.brand}}).sort(typeFilter)
    }
    
    if(!dataFilter){
        res.status(404).json({ error: 'Not Found' });
    }
    res.status(200).json({success: true,message: dataFilter})
}

export const productBrand = async(req,res,next) => {
    try{
        const data = await productModel.aggregate([{
            $lookup: {
              from: 'brands', 
              localField: 'brand',
              foreignField: '_id',
              as: 'brand_info'
            }
          },
        {
            $group:{
                _id:'$brand',
                brand_info:{
                    $first:'$brand_info'
                },
                products:{
                    $push:{
                        _id: '$_id',
                        name: '$name',
                        code: '$code',
                        price: '$price',
                        sale: '$sale',
                        successfulPurchase: '$successfulPurchase',
    
                    }
                }
            }
        },
        {
            $unwind: '$brand_info'
        }
        ]).exec()
        if(data){
            res.status(200).json({success: true,message: 'Đã nhận được dữ liệu',data: data})

        }
        res.status(401).json({success: false,message: 'Không lấy được dữ liệu'})
    }catch(err){

    }
    
    
}   

export const listCategotyBrand = async(req,res,next) => {
    try{
        const data = await productModel.aggregate([{
            $lookup: {
              from: 'brands', 
              localField: 'brand',
              foreignField: '_id',
              as: 'brand_info'
            }
            
          },{
            $lookup: {
                from: 'categories', 
                localField: 'category',
                foreignField: '_id',
                as: 'category_info'
              }
          },
          {
              $group:{
                  _id:'$category',
                  category_info:{
                      $first:'$category_info'
                  },
                  brands:{
                    $addToSet:{
                          _id: '$brand',
                          nameBrand: '$brand_info.name'
      
                      }
                  }
              }
          },
          {
            $unwind: "$category_info"
          }
        
        
    ]).exec()
        if(data){
            res.status(200).json({success: true,message: 'Đã nhận được dữ liệu',data: data})

        }
        res.status(401).json({success: false,message: 'Không lấy được dữ liệu'})
    }catch(err){

    }
    
    
} 

export const productCategory = async(req,res,next) => {
    try{
        const data = await productModel.aggregate([{
            $lookup: {
              from: 'categories', 
              localField: 'category',
              foreignField: '_id',
              as: 'category_info'
            }
          },
        {
            $group:{
                _id:'$category',
                category_info:{
                    $first:'$category_info'
                },
                products:{
                    $push:{
                        _id: '$_id',
                        name: '$name',
                        code: '$code',
                        price: '$price',
                        sale: '$sale',
                        successfulPurchase: '$successfulPurchase',
    
                    }
                }
            }
        },
        {
            $unwind: '$category_info'
        }
        ]).exec()
        if(data){
            res.status(200).json({success: true,message: 'Đã nhận được dữ liệu',data: data})

        }
        res.status(401).json({success: false,message: 'Không lấy được dữ liệu'})
    }catch(err){

    }
    
    
}   

export const createProduct = async(req,res,next)=>{
    try {
        // console.log(req.body)
        // res.status(200).json({success: false, message: req.file.originalname});
        // console.log(req.files)
        const listImage = req.files["listImage"].map(dt => {
            return dt.destination.replace('./public','') + '/' +dt.filename
        })
        const avatar = req.files["avatar"][0].destination.replace('./public','') + '/' + req.files["avatar"][0].filename

        const newProduct = new productModel({...req.body,avatar: avatar,listImage: listImage})
        const issuccess = await newProduct.save();
        if(!issuccess){
            res.status(200).json({success: false, message: "không thể lưu"});
        }
        res.status(200).json({success: true, message: issuccess});
    } catch (error) {
        res.status(200).json({success: false, message: error});
    }
}

export const getList = async(req,res,next) => {
    try {
        await productModel.find({},{createdAt: 0,updatedAt: 0})
        .populate('brand')
        .populate('category')
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
        await productModel.findOne({_id:req.params.id})
        .populate('brand')
        .populate('category')
        .populate('vat')
        .exec()
        .then(data =>{
            res.status(200).json({success: true, data: data});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        })

    } catch (error) {

    }
}

export const getProductsBrand = async(req,res,next) => {
    await productModel.find({brand: req.params.brandId}).then(data => {
        res.status(200).json({success: true, message: data})
    }).catch(err => {
        res.status(200).json({success: false, message: err})
    })
}

export const getProductsCategory = async(req,res,next) => {
    await productModel.find({category: req.params.categoryId}).then(data => {
        res.status(200).json({success: true, message: data})
    }).catch(err => {
        res.status(200).json({success: false, message: err})
    })
}

export const updateId = async(req,res,next) => {
    try{
        if(req.files["listImage"]){
            req.body.listImage = req.files["listImage"].map(dt => {
                return dt.destination.replace('./public','') + '/' +dt.filename
            })
        }
        if(req.files["avatar"]){
            req.body.avatar = req.files["avatar"][0].destination.replace('./public','') + '/' + req.files["avatar"][0].filename
        }
        console.log(req.body)
        await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body,brand: req.body.brand._id,category: req.body.category._id,vat: req.body.vat._id},
            { new: true }
        ).then(data => {
            res.status(200).json({success: true, message: "cập nhật thành công"});
        }).catch(err => {
            res.status(200).json({success: true, message: err});
            
        })
    }catch{err => {

    }}
}
export const deleteId = async(req,res,next) =>{
    try{
        await productModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}