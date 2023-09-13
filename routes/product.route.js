import express from 'express'
import multer from 'multer'
import upload from '../utils/uploadImage.js'
import {createProduct,listCategotyBrand,productBrand,productCategory,deleteId,getId,getList,updateId,getProductsBrand,getProductsCategory,filterProduct} from '../controllers/product.controller.js'
const route = express.Router()
// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,"./public/uploads")
//     },
//     filename: (req,file,cb) => {
//         console.log(file)
//         cb(null,`${Date.now()}_${file.originalname}`);
//     }
// })

// const upload = multer({storage})

route.get('/list',getList)
route.post('/create',upload("products").fields([{name: "avatar",maxCount: 1},{name: "listImage",maxCount: 3}]),createProduct)
route.get('/filter',filterProduct)
route.put('/update/:id',upload("products").fields([{name: "avatar",maxCount: 1},{name: "listImage",maxCount: 3}]),updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.get('/productbrand',productBrand)
route.get('/listcategorybrand',listCategotyBrand)
route.get('/productcategory',productCategory)
route.get('/list-brand/:brandId',getProductsBrand)
route.get('/list-category/:categoryId',getProductsCategory)


export default route