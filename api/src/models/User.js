import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    hash: String,
    token: String,
})

const User = new mongoose.model("User", userSchema);

export default User;