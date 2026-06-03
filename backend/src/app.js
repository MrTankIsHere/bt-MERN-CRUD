const express = require("express");
const cors = require("cors");
const userModel = require("./models/schema.model");

const app = express();

app.use(express.json());

app.use(cors());


app.post("/sendData", async (req, res) => {

    const data = req.body;

    await userModel.create({
        id: data.id,
        name: data.name,
    })

    res.status(200).json({
        msg: "Data created."
    })

})


app.get("/printData", async (req, res) => {

    const data = await userModel.find()

    res.status(200).json({
        userData: data
    });

})


app.get("/findOneUser/:id", async (req, res) => {

    const id = req.params.id

    const data = await userModel.findOne({
        id: id
    })

    res.status(200).json({
        userData: data
    });

})


app.delete("/deleteData/:id", async (req, res) => {

    const id = req.params.id;

    await userModel.deleteOne({
        id: id
    })

    res.status(200).json({
        msg: "Data deleted."
    })

})


app.patch("/updateData/:id", async (req, res)=>{

    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;

    await userModel.updateOne({
        id: id
    }, {
        id: newId,
        name: newName
    })

    res.status(200).json({
        msg: "Data updated."
    })

})





module.exports = app;