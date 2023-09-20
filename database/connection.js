import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MG_CON_AZODA,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mogo success');
    }catch(err){
        console.log(err)
    }
}


export default connectDB