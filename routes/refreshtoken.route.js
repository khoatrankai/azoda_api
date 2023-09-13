import express from 'express'
import {accessLoginAdmin,logInAdmin,logInCustomer,logOutAdmin,accessLoginCustomer,logOutCustomer} from '../controllers/refreshtoken.controller.js'
const route = express.Router()

// route.post('/login-admin',generateRefreshTokenAdmin)
route.post('/login-customer',logInCustomer)
route.post('/customer',accessLoginCustomer)
route.delete('/logout-customer',logOutCustomer)
route.post('/login-admin',logInAdmin)
route.post('/admin',accessLoginAdmin)
route.delete('/logout-admin',logOutAdmin)
// route.post('/signup-customer',signUpCustomer)
// route.post('/login-create',generateRefreshTokenCustomer)


export default route