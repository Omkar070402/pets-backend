import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import 'dotenv/config.js'
import userRouter from './routes/userRouter.js'
import petRouter from './routes/petRouter.js'
import adoptRouter from './routes/adoptRouter.js'

const PORT = 8000

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// database
connectDB()

// api
app.use('/api/v1/user',userRouter)
app.use('/api/v1/pet',petRouter)
app.use('/api/v1/adoption',adoptRouter)

app.get('/',(req,res)=>{
    res.send('API IS WORKING')
})

app.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`);
    
})