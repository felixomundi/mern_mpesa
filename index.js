const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
const ngrok = require("ngrok");
async function ngrokConnect(){
    try {
        var url = await ngrok.connect({
            proto: 'http', 
            addr: 8000,
            authtoken:process.env.AUTH_TOKEN,
           });
           console.log(url)
    } catch (error) {
        console.log(error);
    }

} ngrokConnect();

app.use(cors({   
    origin: ['*'],
   
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/payments", require("./src/routes/mpesaRoute"));


app.listen(PORT,() =>{console.log(`Server up and running on ${PORT}`);});
// # serveo.net
// # ssh -R 80:localhost:8000 serveo.net