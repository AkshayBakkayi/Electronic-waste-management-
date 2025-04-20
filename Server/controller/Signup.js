import Signup from '../models/Singup.js'; // Ensure the correct path to your Signup model
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Generate a secure random password
const generatePassword = (length = 12) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Create a new user (Signup)
export const createSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Encrypt the password before saving
       // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Signup({
            ...req.body,
            password: password,
            confirmationToken: crypto.randomBytes(32).toString('hex') // Secure token
        });

        await newUser.save();
        return res.status(201).json({ message: 'Signup successful' });

    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

// Get all users
export const getAllSignups = async (req, res) => {
    try {
        const users = await Signup.find();
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

// Update user by ID
export const updateSignupById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await Signup.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ data: updatedUser });

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete user by ID
export const deleteSignupById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await Signup.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ data: deletedUser });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(password)
//console.log(user)
        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Respond with user data excluding password
        const { password: _, ...userData } = user.toObject(); // Renaming 'password' to '_' to avoid conflict
        return res.status(200).json(userData);

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Server Error', err });
    }
};


// Reset password and send new one via email
export const resetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Find the user by email
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a new password
        const newPassword = generatePassword();
//console.log(newPassword)
        // Hash the new password
        //const hashedPassword = await bcrypt.hash(newPassword, 10);
        //console.log(hashedPassword)
        // Update the user's password in the database
        user.password = newPassword;
        await user.save();

        // Send the new password via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your New Password',
            text: `Your new password is: ${newPassword}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset successful. Please check your email for the new password.' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
};


// Change user password
export const changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'User ID, current password, and new password are required' });
    }

    try {
        // Find the user by ID
        const user = await Signup.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
       // const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ message: 'An error occurred while changing the password' });
    }
};