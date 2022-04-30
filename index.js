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
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
}, error => error ? console.log(error) : console.log('connected to mongoogse'));


/* create server at port 9000 */
const port = process.env.PORT || 9000
app.listen(port, ()=>{
	console.log("server listening at port 9000")
})

app.use('/api/v1', postroutes)
