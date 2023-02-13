const axios = require("axios");
const db = require("../models");
const Payment = db.payments;

const ngrok = require("ngrok");

(async function(){
    var url = await ngrok.connect({
    proto: 'http', // http|tcp|tls, defaults to http
    addr: 5000,
    authtoken: process.env.AUTHTOKEN,
  
   });
    console.log("url", url)
})();
  




const generateToken = async(req, res,next) => {
    const secret = process.env.SECRET;
    const consumer = process.env.CONSUMER;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    try {
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`,
            }
        });
        if (response.data) {
            token = response.data.access_token;
         
    }
  next() 
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const stkPush = async (req, res) => {
   
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    const date = new Date();
    const timestamp = date.getFullYear() + 
        ("0" + (date.getMonth() + 1)).slice(-2) + 
        ("0" + (date.getDate() + 1)).slice(-2) + 
        ("0" + (date.getHours() + 1)).slice(-2) + 
        ("0" + (date.getMinutes() + 1)).slice(-2) + 
        ("0" + (date.getSeconds() + 1)).slice(-2)
    const shortcode = "174379";
    const passkey = process.env.PASSKEY;
    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64");
    
    const data =  {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": `254${phone}`,
        "PartyB": shortcode,
        "PhoneNumber": `254${phone}`,
        "CallBackURL": url,
        "AccountReference": `254${phone}`,
        "TransactionDesc": "Testing mpesa simulation"
    }
   await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
       data, {
        headers: {
               authorization: `Bearer ${token}`,
            "Content-Type":"application/json", 
        }
    }
   ).then((response) => {
    //    console.log(response);
       const mpesa = response.data.ResponseDescription;
      return res.status(200).json(mpesa);
//   return  res.status(200).json(response.data)
   }).
       catch((error) => {
        console.log(error)
           return res.status(400).json(error.response.data.errorMessage)
           //error.message
    })
}

const callBack = async(req, res) => {    
    try {
        const {callBackData }= req.body;
        console.log(callBackData.Body);
        if (!callBackData.Body.stkCallback.CallbackMetadata) {
        return  res.json("ok")   
        } else {
            const data = callBackData.Body.stkCallback.CallbackMetadata;
           
            const amount = data.Item[0].Value;
            const transaction = data.Item[1].Value;
            const balance = data.Item[2].Value;
            const date = data.Item[3].Value;        
            const phone = data.Item[4].Value;
            let newPayment = {
                amount,transaction,balance,date,phone
            }
            const payment = await Payment.create(newPayment);
            if (payment) {
                return res.status(201).json(payment);
            } else {
                return res.status(400).json("could not make payment")
            }
        } 
    } catch (error) {
        return res.status(500).json(error.message);
    }
    
}

module.exports = {
    generateToken,
    stkPush,
    callBack,
   
}