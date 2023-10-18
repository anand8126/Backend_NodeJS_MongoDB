import  express  from "express";
import { register,login ,registerAdmin} from "../controllers/auth.controller.js";

const router=express.Router();

// create a register API
router.post("/register", register);

// create a login API 

router.post("/login", login);


// register as Admin

router.post("/register-admin", registerAdmin)

export default router;