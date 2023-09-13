import categoryModel from '../models/category.model.js'


export const createCategory = async(req,res,next)=>{
    try {
        if(req.files.icon){
            req.body.icon = req.files.icon[0].destination.replace('./public','') +'/'+req.files.icon[0].filename
        }
        if(req.body.topList === ''){
            req.body.topList = []
        }
        const newCategory = new categoryModel({...req.body})
        await newCategory.save().then(savedData =>{
            res.status(200).json({success: true, message: 'dữ liệu lưu thành công'});
        }).catch(err =>{
            res.status(200).json({success: false, message: 'dữ liệu lưu ko thành công'});
        })

    } catch (error) {

    }
}

export const getList = async(req,res,next) => {
    try {
        const data = await categoryModel.find({},{createdAt: 0,updatedAt: 0})
        .populate('topList.product')
        .exec()
        if(data)
        {
            const newData = await Promise.all(data.map(async dt => {
                const listProduct = await dt.listProduct
                const listBrand = await dt.listBrand
                return {...dt._doc,listProduct: listProduct,listBrand: listBrand}

            }))
           
            res.status(200).json({success: true, data: newData});
        }
        
            res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
        
    } catch (error) {

    }
}
export const getId = async(req,res,next) => {
    try {
            const dataCategory = await categoryModel.findOne({_id:req.params.id},{createdAt: 0,updatedAt: 0}).populate('topList.product').exec();
             if(dataCategory){
                const productCount = await dataCategory.listProduct
                const brandCount = await dataCategory.listBrand
                console.log(brandCount)
                res.status(200).json({success: true, data: {...dataCategory._doc,listProduct: productCount,listBrand: brandCount}});

             }
            
                res.status(200).json({success: false, message: 'dữ liệu không thể lấy'});
            

    } catch (error) {

    }
}
export const updateId = async(req,res,next) => {
    try{
        
        if(req.files.icon){
            req.body.icon = req.files.icon[0].destination.replace('./public','') +'/'+req.files.icon[0].filename
        }
        if(req.body.topList === ''){
            req.body.topList = []
        }else{
            req.body.topList = JSON.parse(req.body.topList).map(dt => {
                return {product: dt.product._id}
            })
        }

        await categoryModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        ).then(data => {
            res.status(200).json({success: true, message: "cập nhật thành công"});
        }).catch(err => {
            res.status(200).json({success: false, message: "cập nhật ko thành công"});
            
        })
        // console.log("vao")
    }catch{err => {
        res.status(200).json({success: false, message: "cập nhật ko thành công"});
    }}
}
export const deleteId = async(req,res,next) =>{
    try{
        await categoryModel.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).json({success:true , message: "xóa thành công"})
        }).catch(err=>{
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
    }catch(err){

    }
}

export const addBrand = async(req,res,next) =>{
    try{
       await categoryModel.findOne({_id: req.params.id}).then(data => {
        if(data.brandList.filter(dt => {return dt.brandId == req.body.brandId}).length > 0)
        {
            res.status(200).json({success:false , message: "đã có sẵn"})
            
        }else{
            data.brandList.push({...req.body})
            categoryModel.findByIdAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
                res.status(200).json({success:true , message: "thêm thành công"})

            }).catch(err => {
                res.status(200).json({success:false , message: "thêm không thành công"})

            })
        }
        
       }).catch(err => {
            res.status(200).json({success:false , message: "thêm không thành công"})

       })
    }catch(err){

    }
}

export const updateListTop = async(req,res,next) => {
    try{
        const newList = []
         req.body.listProduct.find(data => {
            newList.push({product: data})
        });
        console.log(newList)
        await categoryModel.findOneAndUpdate({_id: req.params.categoryId},{topList: newList},{new: true}).then(data => {
            res.status(200).json({success: true,message: "Cập nhật thành công"})
        }).catch(err => {
            res.status(200).json({success: false,message: "Cập nhật không thành công"})

        })
        
    }catch(err) {

    }
}

export const getListTop = async(req,res,next) => {
    try{
        
        await categoryModel.findOne({_id: req.params.categoryId})
        .populate('topList.product')
        .exec()
        .then(data => {
            res.status(200).json({success: true,message: data})
        }).catch(err => {
            res.status(200).json({success: false,message: "Cập nhật không thành công"})

        })
        
    }catch(err) {

    }
}

export const deleteBrand = async(req,res,next) =>{
    try{
       await categoryModel.findOne({_id: req.params.id}).then(data => {
        data.brandList = data.brandList.filter(dt => {return dt.brandId != req.body.brandId})
        categoryModel.findByIdAndUpdate({_id: req.params.id},{...data},{new: true}).then(dt => {
            res.status(200).json({success:true , message: "xoa thành công"})

        }).catch(err => {
            res.status(200).json({success:false , message: "xóa không thành công"})

        })
       }).catch(err => {
            res.status(200).json({success:false , message: "xóa không thành công"})

       })
    }catch(err){

    }
}