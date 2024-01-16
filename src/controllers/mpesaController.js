async function callBack (req,res){
    try {
    console.log(req.body);
    return res.status(200).json("ok")
} catch (error) {
    console.log(error);
}    
}
module.exports = {callBack}