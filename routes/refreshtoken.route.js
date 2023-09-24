import express from 'express'
import AuthToken from '../middleware/AuthToken.js'
import {getUser,signUpAdmin,signUpCustomer,accessLoginAdmin,logInAdmin,logInCustomer,logOutAdmin,accessLoginCustomer,logOutCustomer} from '../controllers/refreshtoken.controller.js'
const route = express.Router()

// route.post('/login-admin',generateRefreshTokenAdmin)
route.post('/login-customer',logInCustomer)
route.post('/customer',accessLoginCustomer)
route.delete('/logout-customer',logOutCustomer)
route.post('/login-admin',logInAdmin)
route.post('/admin',accessLoginAdmin)
route.delete('/logout-admin',logOutAdmin)
route.post('/signup-customer',signUpCustomer)
route.post('/signup-admin',signUpAdmin)
route.post('/getuser',AuthToken,getUser)
// route.post('/signup-customer',signUpCustomer)
// route.post('/login-create',generateRefreshTokenCustomer)


export default route