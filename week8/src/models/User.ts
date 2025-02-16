import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    isAdmin: boolean;    
}

const userSchema: Schema = new Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false },
    isAdmin: { type: Boolean, required: false }
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);

export {IUser, User};
