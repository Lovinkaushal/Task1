const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const dbConnect = require("./config/DBConnect");
const userController = require("./controller/user.controller");
const userSchema = require("./Schemas/userSchema");
var nodemailer = require('nodemailer');
const app = express();
const swaggerUI = require('swagger-ui-express');
const port = process.env.Port || 3000;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
    // #swagger.summary = "Hello World!"
    res.send("Helo from the other side")
});

app.post("/register", async (req, res) => {
        // #swagger.summary = "Register User"
            /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    name:'',
                    email:"", 
                    password:"", 
                    dob:"", 
                    referredby:"", 
                    level:""
                }
        } */
    try {
        let response = await userController.register(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
})

app.post("/login", async (req, res)=>{
    console.log(1);
        // #swagger.summary = "Login User"
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    email:"", 
                    password:"",
                }
        } */
    try {
        console.log(1);
        let response = await userController.login(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
});

app.post("/forgotPass", async function(req, res){
        // #swagger.summary = "ForgotPassword User"
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    email:"", 
                    otp:"", 
                }
        } */
    try {
        let response = await userController.forgotPass(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
});

app.post("/referred", async function(req, res){
        // #swagger.summary = "Reffer User"
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    referredby:"", 
                }
        } */
    try {
        let response = await userController.referred(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
});


app.post("/level", async function(req, res){
        // #swagger.summary = "Level User"
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    level:"", 
                }
        } */
    try {
        let response = await userController.level(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
});

app.post("/otpMatch", async function(req, res){
        // #swagger.summary = "Otp Match User"
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    otp:"", 
                }
        } */
    try {
        let response = await userController.otpMatch(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
});
const swaggerJson = require('./swagger.json')
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJson))

app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})