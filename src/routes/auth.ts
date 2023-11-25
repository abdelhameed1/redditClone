import { Request, Response , Router } from "express";
import { validate } from "class-validator";


import {User} from "../entity/User";

//POST
const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        let errorObject: any = {};
        
        let existingUsername = await User.findOne({where : {username} });
        let existingEmail = await User.findOne({ where: { email } });

        if (existingUsername) errorObject.username = "Username already exists";
        if (existingEmail) errorObject.email = "Email already exists";
        if (Object.keys(errorObject).length > 0) return res.status(400).json(errorObject);
        
       const user = new User({ username, password, email });
       const errors = await validate(user);
         if (errors.length > 0) return res.status(400).json({ errors });
       await user.save();
         return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


const router = Router();

router.post("/register", register);

export default router;