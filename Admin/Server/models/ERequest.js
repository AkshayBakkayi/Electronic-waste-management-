import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        trim: true
    },
    recycleItem: {
        type: String,
        required: true,
        trim: true
    },recycleItemPrice: {
        type: String,
        required: true,
        trim: true
    },pickupDate: {
        type: String,
        required: true,
        trim: true
    },pickupTime: {
        type: String,
        required: true,
        trim: true
    },facility: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    remark: {
        type: String,
        required: true,
        trim: true,
        default:"Open-Wating at Admin"
    },
});

export default mongoose.model('Request', RequestSchema);
