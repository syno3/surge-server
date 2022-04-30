/* import necessary modules */

import express from "express"
import mongoose from "mongoose"
import bodyparser from "body-parser"
import cors from 'cors'

/* import required assets */
import postroutes from "./routes/post.js"


/* setting up the imports */
const app = express()
app.use(bodyparser.json({ limit: "30mb", extended: true}));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


/* connecting to mongodb */
mongoose.connect('mongodb+srv://festus_api:VH1BIolzr8BS6tqj@cluster0.loydg.mongodb.net/driverx?retryWrites=true&w=majority', {
	useNewUrlParser: true,
}, error => error ? console.log(error) : console.log('connected to mongoogse'));


/* create server at port 9000 */
app.listen(9000, ()=>{
	console.log("server listening at port 9000")
})

app.use('/api/v1', postroutes)
