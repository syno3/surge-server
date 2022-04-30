/* handlers for route for logic */
import {company} from "../models/company.js"

/* imports for sending email */
import mg from 'mailgun-js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import nodemailerTransport from 'nodemailer-mailgun-transport';

dotenv.config()

const auth = {
    auth:{
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}

const nodemailerMailgun = nodemailer.createTransport(nodemailerTransport(auth));

export const testroute = async (req, res) =>{
    res.send("works")

}
/* GET ROUTE FOR API KEYS */
export const getapi = async(req, res)=>{
    const api = {
        domain : process.env.OAUTH_DOMAIN_NAME,
        clientId : process.env.OAUTH_CLIENT_ID
    }
    try{
        res.send(api).status(202)
    }catch(error){
        res.status(505).send("cannot retrieve api key")
    }
}
/* POST ROUTE FOR SENDING EMAIL */
export const sendemail = async (req, res)=>{
    const {email, subject, body} = req.body;
    const to ='murimifestus09@gmail.com'

    try{
        await nodemailerMailgun.sendMail({
            from: `Surge website ${email}`,
            to: `${to}`,
            subject: subject,
            html: `<p>${body}</p>`
        })
        res.status(202).send("email send succesfully")
        console.log("mailgun email sent")
    }catch(error){
        console.log("mailgun email failed to send")
        res.status(505).send(error)
    }
}


/* get route for all data */
export const getdata = async (req, res) =>{
    const data = await company.find({})

    try{
        res.send(data).status(200)
        console.log("data logged successfully")
    } catch(err){
        res.status(500).send(err)
    }

}


/*  GET ROUTE FOR LOGINED USER DATA*/
export const getuser = async(req, res) =>{
    try{
        const query = await company.find({}, {"data.user":1, _id: 0})
        res.status(200).send(query)
        console.log('logged succesfully')
    } catch(err){
        res.send(err).status(500)
        console.log('error ocurred')
    }
}


/*  GET ROUTE FOR DRIVER DATA*/
export const getdriver = async(req, res) =>{
    try{
        const query = await company.find({}, {'data.vehicle.data.driver': 1, _id:0})
        res.status(200).send(query)
        console.log("logged driver")
    } catch (error){
        res.status(500).send(error)
        console.log("error occured")
    }
}


/*  GET ROUTE FOR VEHICLE DATA*/
export const getvehicle = async(req, res) =>{
    try{
        const query = await company.find({}, {'data.vehicle.data':1, _id:0})
        res.status(200).send(query)
    } catch (error){
        res.status(500).send(error)
        console.log("error occured")
    }
}


/*  GET ROUTE FOR STATISTICS DATA*/
export const getstatistics = async(req, res) =>{
    try{
        const query = await company.find({}, {'data.vehicle.data.statistics':1, _id:0})
        res.status(200).send(query)
        console.log("logged statitsics")
    } catch (error){
        res.status(500).send(error)
        console.log("error occured in statistics")
    }
}


/*  GET ROUTE FOR NOTIFICATIONS DATA*/
export const getnotifications = async(req, res) =>{
    try{
        const query = await company.find({}, {'data.vehicle.data.notifications':1, _id:0})
        res.status(200).send(query)
        console.log("logged successfuly")
    } catch (error){
        res.status(500).send(error)
        console.log("error occured")
    }
}


/*  GET ROUTE FOR LOCATION OF VEHICLE*/
export const getlocation = async(req, res) =>{
    try{
        const query = await company.find({}, {'data.vehicle.data.location':1, _id:0})
        res.status(200).send(query)
        console.log("logged successfuly")
    } catch (error){
        res.status(500).send(error)
        console.log("error occured")
    }
}


/* POST ROUTE REGISTER ALL DETAILS */
export const createCompany= async(req, res)=>{
    const data = req.body;
    const newCompany = new company(data)
    try{
        await newCompany.save();
        res.status(201).send(newCompany);
        console.log("added succesfully")
    } catch (error){
        res.send(error)
    }
}


/* PUT REQUEST TO UPDATE THE DATABSE */
export const updatedriver = async (req, res)=>{
    const params = req.params.id
    try{
        const updatedriver = await company.findByIdAndUpdate(params, {
            $set:{
                "data.vehicle.data.driver.firsname": req.body.firsname,
                "data.vehicle.data.driver.lastname": req.body.lastname, 
                "data.vehicle.data.driver.idNumber": req.body.idNumber, 
                "data.vehicle.data.driver.email": req.body.email
            }
        })
        res.status(202).json({"message":"updated driver succesfully"})
    } catch(error){
        res.json({"error":error}).status(505)
    }
}

export const updatevehicle = async (req, res)=>{
    const params = req.params.id
    try{
        const updatevehicle = await company.findByIdAndUpdate(params, {
            $set:{
                "data.vehicle.data.licensePlate" : req.body.licensePlate,
                "data.vehicle.data.chasisNo": req.body.chasisNo,
                "data.vehicle.data.engineNo": req.body.engineNo,
                "data.vehicle.data.RegistratioDate": req.body.RegistratioDate,
                "data.vehicle.data.fuel": req.body.fuel,
                "data.vehicle.data.pucc": req.body.pucc,
                "data.vehicle.data.mvtax": req.body.mvtax,
                "data.vehicle.data.surgeId": req.body.surgeId,
                "data.vehicle.data.fitness": req.body.fitness
            }
        })
        res.status(202)
    }catch(error){
        res.json({"error":error}).status(505)
    }
}