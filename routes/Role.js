import express from "express";

import {createRole, updateRole,getRole, deleteRole} from "../controllers/role.controller.js"

const router=express.Router();

// Create a new role in DB
router.post("/create", createRole);


// Create a update role in DB

router.put('/update/:id', updateRole);

//create a get all role in db
router.get("/allRole",getRole);


// Delete a role in DB

router.delete("/delete/:id", deleteRole)



export default router;