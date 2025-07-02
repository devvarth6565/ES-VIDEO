import httpStatus from 'http-status';
import {User} from '../models/user.model.js';
import bycrypt,{hash} from 'bcrypt';
import crypto from 'crypto';


//user login

const login = async(req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(400).json({message:"Username and password are required"});
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordCorrect = await bycrypt.compare(password, user.password);
        if(isPasswordCorrect)
        {
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token})
        }else{
            return res.status(httpSttus.UNAUTHORIZED).json({message:"Invalid password or username"});
        }
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:`Something went wrong ${e}`});
    }

}


//user register

const register = async(req,res)=>{
    const{name,username,password} = req.body;


    try{
        const existingUser = await User.findOne({username});
        if(existingUser)
        {
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }
        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User registered "});

    }catch(e){
        res.json({message:`Something went wrong ${e}`})

    }
}

export {login, register};