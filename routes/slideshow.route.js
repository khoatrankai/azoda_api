import express from 'express'
import upload from '../utils/uploadImage.js'
import {createSlideshow,getList,deleteId,updateId,getId} from '../controllers/slideshow.controller.js'
const route = express.Router()

route.post('/create',upload('slidershows').fields([{name: 'image',maxCount: 1}]),createSlideshow);
route.get('/list',getList);
route.delete('/delete/:id',deleteId);
route.put('/update/:id',upload('slidershows').fields([{name: 'image',maxCount: 1}]),updateId);
route.get('/list/:id',getId)


export default route
