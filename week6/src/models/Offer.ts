import mongoose, { Document, Schema } from 'mongoose';

interface IOffer extends Document {
    title: string,
    description: string,
    price: number,
    imageId?: string,
}

let OfferSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: String, required: false },
});

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>("Offer", OfferSchema);

export { Offer, IOffer };
