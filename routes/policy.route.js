import express from 'express'
import { createPolicy,deleteId,getId,getList,updateId } from '../controllers/policy.controller.js'
const route = express.Router()

route.get('/list',getList)
route.post('/create',createPolicy)
route.put('/update/:id',updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)


export default route