import mongoose from 'mongoose';

const assistSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // Add userId field
    name: { type: String, required: true },
    email: { type: String, required: true },
    accept: { type: Boolean, default: false }
}, { timestamps: true });

const assistModel = mongoose.model('Assist', assistSchema);
export default assistModel;
