import express from 'express'
import upload from '../utils/uploadImage.js'
import {updateAll,createSocial,deleteSocial,updateSocial,getInfoCompany} from '../controllers/company.controller.js'

const route = express.Router()


route.put('/update',upload('company').fields([{name: 'logo',maxCount: 1},{name: 'sourceImg',maxCount: 10}]),updateAll)
route.patch('/update-social/:id',updateSocial)
route.delete('/delete-social/:id',deleteSocial)
route.post('/create-social',createSocial)
route.get('/getinfo',getInfoCompany)

export default route