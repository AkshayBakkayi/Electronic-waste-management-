import Signup from '../models/Singup.js';
import bcrypt from 'bcrypt';
export const createSignup = async (req, res) => {
    try {
        const category = new Signup(req.body);
        const email = category.email;
        const existingUser = await Signup.findOne({ email });

        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const confirmationToken = Math.random().toString(36).substr(2);
        category.confirmationToken = confirmationToken;
        await category.save();
        return res.status(200).json({ message: 'Signup successfully' });

    } catch (err) {
        console.error('Error creating category:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};
export const FindUserscounts = async (req, res) => {
    const data = await Signup.find();
    console.log(data)

    return res.status(200).json(data.length);
};
export const getAllSignups = async (req, res) => {
    try {
        return res.status(200).json(await Signup.find());
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


export const updateSignupById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const category = await Signup.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: category });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteSignupById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Signup.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ data: category });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(404)
                .json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password); //true or false
        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json(user)

    } catch (err) {
        return res.status(500)
            .json({ message: "Server Error", err })
    }
}