import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Pusher from "pusher"
import Messages from "./dbmessages.js"
import Rooms from "./dbroom.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.PORT || 9000;

app.use(cors())
app.use(express.json())

const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "ap2",
    useTLS: true
});


const url = process.env.DATABASE;
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((err) => {
        console.log(err.stack)
        process.exit(1)
    }).then(() => {
        console.log("Connect to MongoDb")
    })

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB is Started")

    const msgCollection = db.collection("messagecontents");
    const changestream = msgCollection.watch();

    changestream.on("change", (change) => {
        if (change.operationType === "insert")
         {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                chat_received: messageDetails.chat_received
            })
        } else {
            console.log("Error Trigger Pusher")
        }
    })

    const roomsCollection = db.collection("roomcontents")
    const changestream1 = roomsCollection.watch()

    changestream1.on("change", (change) => {
        if (change.operationType === "insert") {
            const roomsDetails = change.fullDocument;
            pusher.trigger("rooms", "inserted", {
                roomname: roomsDetails.roomname,
            })
        } else {
            console.log("Error Trigger Pusher")
        }
    })
})


app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


app.post("/messages/new", (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.get("/rooms/sync", (req, res) => {
    Rooms.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/rooms/new", (req, res) => {
    const dbroom = req.body
    Rooms.create(dbroom, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/",(req,res)=>{
    res.json("Server Started")
})

if(process.env.NODE_ENV==="production"){
app.use(express.static("/client/build"));
}

app.listen(port, () => {
    console.log(`Server is start now: ${port}`)
    
})