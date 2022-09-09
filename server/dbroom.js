import mongoose from "mongoose";

const roomSchema=mongoose.Schema({
    roomname:String,
});

export default mongoose.model("roomcontents",roomSchema)