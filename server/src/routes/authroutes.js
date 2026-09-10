import express from "express";

import passport from "../config/passport.js";


import {

register,

login,

getCurrentUser,

googleCallback,

githubCallback

} from "../controllers/authController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();




// Register/Login

router.post(
"/register",
register
);


router.post(
"/login",
login
);






// GOOGLE


router.get(

"/google",

passport.authenticate(

"google",

{
scope:[
"profile",
"email"
]

}

)

);



router.get(

"/google/callback",

passport.authenticate(

"google",

{
session:false
}

),

googleCallback

);







// GITHUB


router.get(

"/github",

passport.authenticate(

"github",

{
scope:[
"user:email"
]

}

)

);





router.get(

"/github/callback",

passport.authenticate(

"github",

{
session:false
}

),

githubCallback

);






router.get(

"/me",

authMiddleware,

getCurrentUser

);



export default router;