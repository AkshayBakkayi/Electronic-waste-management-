import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SignupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },password: {
        type: String,
        required: true,
        trim: true
    },confirmPassword: {
        type: String,
        required: true,
        trim: true
    },
});
SignupSchema.pre('save', async function () {
    try {
        const userData = this;
        const saltRounds = 10;

        if (userData.isModified('password')) {
            userData.password =
                await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});
export default mongoose.model('Signup', SignupSchema);
