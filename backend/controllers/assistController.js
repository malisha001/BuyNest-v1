import assistModel from "../models/assistModel.js";

//get all assist request
const getAssist = async (req, res) => {
    try {
        // Retrieve only documents where accept is true
        const assist = await assistModel.find({ accept: false });
        res.json({ success: true, assist });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//request assist
const requestAssist = async (req, res) => {
    try {
        const { name, email, accept } = req.body
        const newAssist = new assistModel({ name, email, accept })
        await newAssist.save()

        res.json({ success: true, message: "Assist request sent successfully" })
    }catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { getAssist, requestAssist }

//update assist request accept status 
const updateAssist = async (req, res) => {
    try {
        const { id } = req.params;
        const { accept } = req.body;
        const assist = await assistModel.findById(id);
        assist.accept = accept;
        await assist.save();
        res.json({ success: true, message: 'Assist request updated successfully' });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

