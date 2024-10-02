import mongoose from 'mongoose'

const refundSchema = new mongoose.Schema({
    orderID:  { type: String, required: true, unique: true },
    userID: { type: String ,required: true},
    additionalInfo: { type: String,reqired:true},
    reasons: { type: String, required: true },
    date: {type: Number, required: true},
    reqestDate: {type: Number,  required: true}
})

const refundModel = mongoose.models.refund || mongoose.model("refund",refundSchema);
export default refundModel;