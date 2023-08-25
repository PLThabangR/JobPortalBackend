export const testController=(req,res)=>{
    const{name }  = req.body

    res.status(200).send(`Your name is ${name}`)

}

