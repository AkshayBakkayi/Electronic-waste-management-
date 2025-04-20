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