import Request from '../models/ERequest.js';

export const createERequest = async (req, res) => {
    try {
        const ERequest = new Request(req.body);        
        
       
        await ERequest.save();
        return res.status(200).json({ message: 'ERequest created successfully' });

    } catch (err) {
        console.error('Error creating ERequest:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

export const getAllERequests = async (req, res) => {
    try {
        return res.status(200).json(await Request.find());
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


export const updateERequestById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const ERequest = await Request.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: ERequest });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteERequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const ERequest = await Request.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ data: ERequest });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}





export const getERequestByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the ERequest by userId
        const ERequest = await Request.find({ userId: userId }).exec();
        //console.log(ERequest);
        // If no ERequest is found, return a 404 response
        if (!ERequest) {
            return res.status(404).json({ message: 'ERequest not found for the given userId' });
        }

        // Return the found ERequest, ensuring no circular references
        return res.status(200).json({ data: ERequest });

    } catch (error) {
        console.error('Error fetching ERequest by userId:', error.message || error);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

