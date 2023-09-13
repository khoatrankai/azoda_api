import express from 'express'
import {createVat,getList,deleteId,updateId,getId} from '../controllers/vat.controller.js'
const route = express.Router()

route.post('/create',createVat);
route.get('/list',getList);
route.delete('/delete/:id',deleteId);
route.put('/update/:id',updateId);
route.get('/list/:id',getId)


export default route
