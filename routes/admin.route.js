import express from 'express'
import {createAdmin,deleteId,getId,getList,updateId,addPage,deletePage,updateFunc} from '../controllers/admin.controller.js'
const route = express.Router()


route.get('/list',getList)
route.post('/create',createAdmin)
route.put('/update/:id',updateId)
route.delete('/delete/:id',deleteId)
route.get('/list/:id',getId)
route.patch('/addpage/:id',addPage)
route.delete('/pagelist-delete/:id',deletePage)
route.patch('/pagelist-update/:id',updateFunc)

export default route