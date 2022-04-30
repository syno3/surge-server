import mongoose from "mongoose"
const { Schema } = mongoose

const companySchema = new Schema(
    {
    title: {type: String, required:true},
    createdAt: {type: Date, default: Date.now},
    data:{
        user: {
            Name: {type:String, default:"admin"},
            role: {type: String, default: "support manager"},
        },
        vehicle: [{
            data: {
                licensePlate: String,
                chasisNo: Number,
                engineNo: Number,
                RegistratioDate: {type:Date, default: Date.now},
                fuel: String,
                pucc: String,
                mvtax: {type:Date, default: Date.now},
                surgeId: Number,
                fitness: {type:Date, default: Date.now},
                driver: [{
                    firsname: String,
                    lastname: String,
                    idNumber: Number,
                    email: String,
                }],
                statistics:{
                    stoptime: [{
                        createdAt: {type:Date, default: Date.now},
                        amount: Number,
                    }],
                    fuelconsumption: [{
                        createdAt: {type:Date, default: Date.now},
                        amount: Number,
                    }],
                    drivingtime:[{
                        createdAt: {type:Date, default: Date.now},
                        amount: Number,
                    }],
                    spentonfuel:[{
                        createdAt: {type:Date, default: Date.now},
                        amount: Number,
                    }],
                },
                notifications:[
                    {
                        event: String,
                        occuredAt: {type:Date, default: Date.now},
                        location: {
                            longitude: Number,
                            latitude: Number,
                        }
                    }
                ],
                location:[
                    {
                        longitude: Number,
                        latitude: Number,
                        time: {type:Date, default: Date.now},
                    }
                ]
            }
        }]
    }
});

export const company = mongoose.model("company", companySchema);