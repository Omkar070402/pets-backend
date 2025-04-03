import express from 'express'
import { adoptRequest, getAdoptionRequests, updateAdoptionStatus } from '../controllers/adoptController.js'

const adoptRouter = express.Router()

adoptRouter.post('/request',adoptRequest)
adoptRouter.get('/request/:email',getAdoptionRequests)
adoptRouter.patch('/request/:id',updateAdoptionStatus)


export default adoptRouter