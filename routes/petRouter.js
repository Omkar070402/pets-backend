import express from 'express'
import { addPet, deletePet, getPet, getPetById, updatePet } from '../controllers/petController.js'
import upload from '../middlewares/multer.js'

const petRouter = express.Router()

petRouter.get('/get',getPet)
petRouter.post('/add',upload.array("images",4),addPet)
petRouter.delete('/delete/:id',deletePet)
petRouter.put('/update/:id', upload.array("images", 4), updatePet);
petRouter.get('/get/:id', getPetById);





export default petRouter