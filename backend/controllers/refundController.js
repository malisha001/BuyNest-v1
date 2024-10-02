import refundModel from '../models/refundModel.js'

const placeRefund = async (req, res) => {
    try{
        
        const { orderID, userID, reasons, additionalInfo, date } = req.body
        {console.log(req.body)}

        const refundData = {
            orderID,
            userID,
            reasons,
            additionalInfo,
            date,
            reqestDate: Date.now()
        }
        console.log(refundData);

        const refund = new refundModel(refundData);
        await refund.save();
        res.json({ success: true, message: "Refund request placed" });
        
        if (!refund) {
            return res.status(400).json({ success: false, message: 'Refund request failed' });
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const getAllRefunds = async (req, res) => {
    try {
        const refunds = await refundModel.find({});
        res.json({ success: true, refunds });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeRefund, getAllRefunds }

