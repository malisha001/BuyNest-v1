import refundModel from '../models/refundModel.js'

const placeRefund = async (req, res) => {
    try{
        
        const { orderID, rfun_userId, reasons, additionalInfo, date } = req.body;
        {console.log(req.body)}

        if (!orderID || !reasons || !date) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const refundData = {
            orderID,
            userId: rfun_userId,
            reasons,
            additionalInfo,
            date,
            reqestDate: Date.now()
        }

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
        res.json({ success: true, data: refunds });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeRefund, getAllRefunds }

