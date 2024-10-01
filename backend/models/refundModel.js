import mongoose from 'mongoose'

const refundSchema = new mongoose.Schema({
    orderID:  { type: String, required: true },
    userID: { type: String, required: true },
    additonalInfo: { type: String},
    reasons: { type: String },
    date: {type: Number},
    reqestDate: {type: Number}
})

const refundModel = mongoose.models.refund || mongoose.model("refund",refundSchema);
export default refundModel;