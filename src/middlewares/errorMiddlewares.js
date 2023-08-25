//error middle ware || next function
const errorMiddleware =(err,req,res,next)=>{
console.log(err);
const defaultErrors={
    statusCode:500,
    message:err
}
//missing file errors
    if(err.name==='ValidationError'){
        defaultErrors.statusCode=400
        defaultErrors.message=Object.values(err.errors).map(item =>item.message).join(',')
    }
    //Duplicate error
    if(err.code && err.code ===1100){
        defaultErrors.statusCode=400
        defaultErrors.message=`${Object.keys(err.keyValue)} field has to be unique`;
    }//

    //default respons
    res.status(defaultErrors.statusCode).json({message:defaultErrors.message})
}
export default errorMiddleware;