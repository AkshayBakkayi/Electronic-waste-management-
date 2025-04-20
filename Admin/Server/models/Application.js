
import mongoose, { Schema } from 'mongoose'

const applicationSchema = new Schema({
    scholorshipId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Scholarship',
    },
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[789]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    additionalNotes: {
        type: String,
        default: '',
    },
    photo: {
        type: String, // URL or path to the uploaded photo
        default: null,
    },
    aadharCard: {
        type: String, // URL or path to the uploaded Aadhar card
        default: null,
    },
    marksCards: {
        type: String, // URL or path to the uploaded marks cards
        default: null,
    },
    collegeRecipt: {
        type: String, // URL or path to the uploaded college receipt
        default: null,
    },
    status: {
        type: String
    },
    remarks: {
        type: String
    },
    approvedAmount: {
        type: String
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the model
export default mongoose.model('Application', applicationSchema);