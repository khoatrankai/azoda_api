import express from 'express'
import {addProduct,checkPrice,createDiscount,deleteId,deleteProduct,getId,getList,updateId} from '../controllers/discount.controller.js'
const route = express.Router()

route.get('/list',getList)
route.post('/create',createDiscount)
route.put('/update/:id',updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.get('/check/:id',checkPrice)
route.post('/add-product/:id',addProduct)
route.delete('/delete-product/:id',deleteProduct)


export default route