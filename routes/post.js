/* post routes javascrip */

import express from 'express'

import { 
    testroute, 
    createCompany, 
    getdata,
    getuser,
    getdriver,
    getvehicle,
    getstatistics,
    getnotifications,
    getlocation,
    updatevehicle,
    updatedriver,
    sendemail,
    getapi
} from '../controllers/post.js';

const router = express.Router();

/* test if router is working */
router.get("/", testroute)


/* important routes for making api calls */
/* GET request */
router.get("/data", getdata)
router.get("/get_api", getapi)


router.get("/user", getuser)
router.get("/driver", getdriver)
router.get("/vehicle", getvehicle)
router.get("/statistics", getstatistics)
router.get("/notifications", getnotifications)
router.get("/location", getlocation)


/* POST REQUESTS */
router.post("/add_company", createCompany)
router.post("/send_email", sendemail)


/* PUT REQUEST */
router.put('/update_vehicle/:id', updatevehicle)
router.put('/update_driver/:id', updatedriver)


export default router