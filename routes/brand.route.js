import express from 'express'
import upload from '../utils/uploadImage.js'
import {getId,getList,createBrand,deleteId,updateId,updateListTop,getListTop} from '../controllers/brand.controller.js'
const route = express.Router()


route.get('/list',getList)
route.post('/create',upload('brands').fields([{name: 'logo',maxCount: 1}]),createBrand)
route.put('/update/:id',upload('brands').fields([{name: 'logo',maxCount: 1}]),updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.post('/update-top/:brandId',updateListTop)
route.get('/get-top/:brandId',getListTop)

export default route