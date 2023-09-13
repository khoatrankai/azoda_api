import express from 'express'
import {getHome,createPage,deleteId,getId,getList,updateId} from '../controllers/page.controller.js'
const route = express.Router()

route.get('/list',getList)
route.post('/create',createPage)
route.put('/update/:id',updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.get('/home',getHome)


export default route