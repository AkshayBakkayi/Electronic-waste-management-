import Category from '../models/Scholorship.js';
import request from '../models/ERequest.js';

export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);

        if (!category.name) {
            return res.status(400).json({ message: 'Please provide  name' });
        }

        await category.save();
        return res.status(200).json({ message: 'Category created successfully' });

    } catch (err) {
        console.error('Error creating category:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        return res.status(200).json(await request.find());
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


export const getScholorshipById = async (req, res) => {
    try {
        return res.status(200).json(await Category.findById(req.params.id));
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
}

export const updateCategoryById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: category });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ data: category });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}