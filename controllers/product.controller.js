import productModel from '../models/product.model.js'
import brandModel from '../models/brand.model.js'
import categoryModel from '../models/category.model.js'




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

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); 
    str = str.replace(/ + /g," ");
    str = str.trim();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
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
        await productModel.find({})
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
const findKey = (key,data)=>{
    const keyword = removeVietnameseTones(key)
    if(keyword != key){

        if(data.search(key) != -1){
            return true
        }

        return false
    }else{

        if(removeVietnameseTones(data).search(key) != -1){
            return true
        }
        return false

    }
// return false


    

}


export const searchProduct = async(req,res,next) => {
    try {
        let newdata = await productModel.aggregate([
            {
                $lookup: {
                  from: 'brands', 
                  localField: 'brand',
                  foreignField: '_id',
                  as: 'brand'
                }
              },{
                $unwind: "$brand"
              },
              {
                  $lookup: {
                    from: 'categories', 
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                  }
                },{
                  $unwind: "$category"
                }
              ,
              {
                $project: {
                    '_id': 1,
                    'code': 1,
                    'name': 1,
                    'price': 1,
                    'quantity': 1,
                    'avatar': 1,
                    'listImage': 1,
                    'sale': 1,
                    'enable': 1,
                    'brand': '$brand.name ',
                    'category': '$category.name',
                    'key': {
                        $concat:[
                            '$brand.name',"-",'$category.name',"-",'name'
                        ]
                    },
                    'successfulPurchase': 1
                }
                
              }
        
        ]).exec();
        newdata = await newdata.filter(dt => {
            return findKey(req.body.keyword.toLowerCase(),dt.key.toLowerCase())
        })
        // if(newdata.length > 0)
        // {
        //     res.status(200).json({success: true, data: newdata});
        // }else{
        //     res.status(200).json({success: false, message: 'không có dữ liệu'});
        // }

    } catch (error) {
        res.status(400).json({success: false, message: 'lỗi máy chủ'});

    }
}

export const getId = async(req,res,next) => {
    try {
        
        const data = await productModel.findOne({_id:req.params.id})
        .populate('brand')
        .populate('category')
        .populate('vat')
        .exec()
        const dataProduct = await productModel
        .aggregate([
            {
                $match:{
                    $and:[
                        {
                            $or:[
                                {
                                    category: {
                                        $eq: data.category._id
                                    }
                                },
                                {
                                    brand: {
                                        $eq: data.brand._id
                                    }
                                }
                            ]
                        },
                        {
                            _id:{
                                $ne: data._id
                            }
                        }
                    ]
                }
              },
              {
                        $limit: 10
              },
                {
                    $lookup: {
                      from: 'brands', 
                      localField: 'brand',
                      foreignField: '_id',
                      as: 'brand'
                    }
                  },{
                    $unwind: "$brand"
                  },
                  {
                      $lookup: {
                        from: 'categories', 
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category'
                      }
                    },{
                      $unwind: "$category"
                    }
                  ,
                  
                  {
                    $project: {
                        '_id': 1,
                        'code': 1,
                        'name': 1,
                        'price': 1,
                        'quantity': 1,
                        'avatar': 1,
                        'listImage': 1,
                        'sale': 1,
                        'enable': 1,
                        'brand': '$brand.name',
                        'category': '$category.name',
                        'successfulPurchase': 1
                    }
                  }
                  
            
    ]).exec()
        // .find({brand: data.brand._id,category: data.category_id,'_id': {$ne: req.params.id}},{sourceCode: 0}).limit(10)
        res.status(200).json({success: true, data: {...data._doc,productRelate: dataProduct}});


    } catch (error) {
        res.status(200).json({success: false, message: 'lỗi máy chủ'});
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