import assistModel from "../models/assistModel.js"; 

// Get all assist requests (where 'accept' is false)
const getAssist = async (req, res) => {
    try {
        // Retrieve only requests where 'accept' is false
        const assistRequests = await assistModel.find({ accept: false });

        // Respond with the assist requests data
        res.json({ success: true, assist: assistRequests });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Request for live assistance
const requestAssist = async (req, res) => {
    try {
        const { userId, name, email, accept } = req.body; // Extract userId, name, and email from the request

        // Create a new assistance request and save it to the database
        const newAssist = new assistModel({ userId, name, email, accept });
        await newAssist.save();

        // Respond with a success message
        res.json({ success: true, message: "Assist request sent successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update assist request (to set 'accept' to true)
const updateAssistStatus = async (req, res) => {
    try {
        const { id } = req.params;  // Get assist request ID from params

        // Find the assist request by ID and update the 'accept' field to true
        const updatedAssist = await assistModel.findByIdAndUpdate(id, { accept: true }, { new: true });

        // Check if the request was found and updated
        if (!updatedAssist) {
            return res.status(404).json({ success: false, message: "Assist request not found" });
        }

        // Respond with success and the updated request
        res.json({ success: true, message: "Assist request accepted", assist: updatedAssist });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete an assist request (if needed, can be used to clean up after sessions)
const deleteAssist = async (req, res) => {
    try {
        const { id } = req.params; // Get assist request ID from params

        // Delete the assist request by ID
        const deletedAssist = await assistModel.findByIdAndDelete(id);

        // Check if the request was found and deleted
        if (!deletedAssist) {
            return res.status(404).json({ success: false, message: "Assist request not found" });
        }

        // Respond with success and deletion confirmation
        res.json({ success: true, message: "Assist request deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAssist, requestAssist, updateAssistStatus, deleteAssist };
