import express from 'express';
import {getIdUser, getAllUser} from '../controllers/user.controller.js'
const router=express.Router();


// get All

router.get("/", getAllUser);

// get by ID

router.get("/:id",getIdUser)

export default router