import express from 'express'
import upload from '../utils/uploadImage.js'
import {getList,createPartner,deleteId,updateId,getId} from '../controllers/partner.controller.js'
const route = express.Router()

route.get('/list',getList)
route.post('/create',upload('partners').fields([{name: 'image',maxCount: 1}]),createPartner)
route.put('/update/:id',upload('partners').fields([{name: 'image',maxCount: 1}]),updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
export default route