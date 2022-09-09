import mongoose from "mongoose";

const data=mongoose.Schema({
message:String,
name:String,
chat_received:Boolean,
});

export default mongoose.model("messagecontents",data)