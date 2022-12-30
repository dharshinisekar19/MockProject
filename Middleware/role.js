const authorization = (rolePermit) =>{
    return(req,res,next) =>{
        const userRole = req.role;
        if (rolePermit.includes(userRole)){
            next()
        }else{
            return res.status(401).json("you not have access to view")
        }
    }
}
module.exports = {authorization}