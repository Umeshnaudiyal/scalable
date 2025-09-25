const express=require('express');
const app=express();
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieparser=require('cookie-parser')
require('dotenv').config();
const PORT=process.env.PORT || 3000
const cors=require('cors');


//body parser
app.use(bodyParser.json())

const connectmongoDB=require('./Models/db')
connectmongoDB();
app.use(cookieparser());

app.use(cors({credentials:true}));
const routes=require('./Routes/Authrouter');
const product =require('./Routes/productrouter');

app.use('/',routes);
app.use('/product',product);


app.get('/',(req,res)=>{

})

app.listen(PORT,()=>{
    console.log(`port ${PORT} is working fine`)
})

