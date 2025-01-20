import mongoose, {Schema, Document} from "mongoose";

interface ITopic extends Document {
    title: string,
    content: string,
    username: string,
    createdAt: Date
};

const topicSchema: Schema = new Schema ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    username: {type: String, required: true},
    createdAt: {type: Date, required: true}
});

const Topic: mongoose.Model<ITopic> = mongoose.model<ITopic>("Topic", topicSchema);

export {ITopic, Topic};
