// import mongoose, {Document, Schema} from "mongoose";

interface IUser {
    email: string;
    password: string;
}

// const UserSchema: Schema<IUser> = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

// const User: mongoose.Model<IUser> = mongoose.model("User", UserSchema);

export {IUser};
