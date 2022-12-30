const bcrypt = require("bcryptjs");

async function HashGenerate(plainPassword){
    const hash = await bcrypt.hash(plainPassword,8)
    return hash;
}
async function HashValidator(plainPassword,hashedPassword){
    try{
        const result = await bcrypt.compare(plainPassword,hashedPassword);
        return result;
    }catch(err){
        return false;
    }
}

module.exports ={ HashGenerate,HashValidator}