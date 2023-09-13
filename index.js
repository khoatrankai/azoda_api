import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connection.js'
import slideShowRoute from './routes/slideshow.route.js'
import refreshTokenRoute from './routes/refreshtoken.route.js'
import productRoute from './routes/product.route.js'
import policyRoute from './routes/policy.route.js'
import partnerRoute from './routes/partner.route.js'
import pageRoute from './routes/page.route.js'
import adminRoute from './routes/admin.route.js'
import orderRoute from './routes/order.route.js'
import discountRoute from './routes/discount.route.js'
import customerRoute from './routes/customer.route.js'
import companyRoute from './routes/company.route.js'
import categoryRoute from './routes/category.route.js'
import brandRoute from './routes/brand.route.js'
import vatRoute from './routes/vat.route.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();



dotenv.config({ path: '.env' })
const port = process.env.PORT ?? 3000
connectDB();

app.use(cookieParser())
// app.use(cors({ origin: 'http://localhost:3000' , credentials: true}))
app.use(cors({
    origin: '*',
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials:true,
    optionSuccessStatus:200,
}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/slideshow',slideShowRoute);
app.use('/api/brand',brandRoute);
app.use('/api/partner',partnerRoute);
app.use('/api/category',categoryRoute);
app.use('/api/company',companyRoute);
app.use('/api/customer',customerRoute);
app.use('/api/discount',discountRoute);
app.use('/api/order',orderRoute);
app.use('/api/admin',adminRoute);
app.use('/api/page',pageRoute);
app.use('/api/refreshtoken',refreshTokenRoute);
app.use('/api/product',productRoute);
app.use('/api/policy',policyRoute);
app.use('/api/vat',vatRoute);


app.listen(port,()=>{
    console.log("server connect")
})

 