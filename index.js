const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
   
    origin: ['http://localhost:3000'],
   
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/mpesa", require("./src/routes/mpesaRoute"));

app.listen(
   PORT,
    () => {
    console.log(`Server up and running on ${PORT}...`);
    }
);
