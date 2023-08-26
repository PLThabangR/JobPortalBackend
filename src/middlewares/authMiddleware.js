import JWT from 'jsonwebtoken';

const userAuth = async (req,res,next) =>{
    const authHeader =req.headers.authorization

    //Check if headers are set or not
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next("Auth failed")
    }
    /*
    /The split() method splits a string into an array of substrings.
    /(" ") is used as separator, the string is split between words
    */
    const token = authHeader.split(" ")[1]

    try{
        const payload = JWT.verify(token, process.env.JWT_SECRET)

        req.user={userId: payload.userId}
        next()
    }catch(error){
        next('Auth Failed')
    }
}

export default userAuth;