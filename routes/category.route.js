import express from 'express'
import upload from '../utils/uploadImage.js'
import {addBrand,createCategory,deleteId,getId,getList,updateId,deleteBrand,updateListTop,getListTop} from '../controllers/category.controller.js'
const route = express.Router()


route.get('/list',getList)
route.post('/create',upload('categories').fields([{name: 'icon',maxCount: 1}]),createCategory)
route.put('/update/:id',upload('categories').fields([{name: 'icon',maxCount: 1}]),updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.post('/add-brand/:id',addBrand)
route.delete('/delete-brand/:id',deleteBrand)
route.post('/update-top/:categoryId',updateListTop)
route.get('/get-top/:categoryId',getListTop)


export default route