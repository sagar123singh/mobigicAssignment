const jwt = require('jsonwebtoken')

const Authorise = async function(req, res, next){
    
   try{

  
    let token = req.headers["x-auth-token"]
    if(!token) {return res.status(400).send({Status:false, msg:"Token must be present"})}

    let decodedToken = jwt.verify(token, 'mobigicproject')
    if(!decodedToken) {return res.status(400).send({status:false, msg:"Invalid token id"})}
    
 next()
}catch(err){
    console.log("This is the error :", err.message);
    return res.status(500).send({ msg: "Error", error: err.message });
       }
}
module.exports.Authorise=Authorise