require("dotenv").config();
const jwt = require('jsonwebtoken');
const { getUser } = require("./DBUtility");

const checkUser= (id, password)=>{
    return getUser(id, password);
}

const tokenVerify= (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, data)=>{
            if(err){
                return res.sendStatus(403);
            }
            
            req.data=data;
            next();
        });
    }
    else{
        return res.sendStatus(401);
    }
}

const generateAccessToken= (data)=>{
    return jwt.sign(data, process.env.ACCESS_TOKEN_KEY);
}

module.exports = {tokenVerify, generateAccessToken, checkUser};