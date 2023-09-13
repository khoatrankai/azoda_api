import express from 'express'
import {statusEnum,createOrder,getListOrderDate,deleteId,getId,getList,updateId,updateStatus,getOrderCustomerId} from '../controllers/order.controller.js'
const route = express.Router()

route.get('/list',getList)
route.post('/create',createOrder)
route.put('/update/:id',updateId)
route.delete('/delete/:id',deleteId)
route.get('/newlist',getListOrderDate)
route.get('/enumstatus',statusEnum)
route.get('/list/:id',getId)
route.get('/orderid/:id',getOrderCustomerId)
route.patch('/update-status/:id',updateStatus)


export default route