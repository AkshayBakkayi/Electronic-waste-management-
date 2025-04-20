

import Application from '../models/Application.js';
import Scholorship from '../models/Scholorship.js';
import request from '../models/ERequest.js';
import { sendApprovalEmail, sendOrgApprovalEmail, sendOrgRejectEmail, sendRejectEmail } from '../utils/EmailService.js';

export const Apply = async (req, res) => {

    try {
        const applicationData = {
            ...req.body,
            photo: req.files['photo'] ? req.files['photo'][0].path : null,
            aadharCard: req.files['aadharCard'] ? req.files['aadharCard'][0].path : null,
            marksCards: req.files['marksCards'] ? req.files['marksCards'][0].path : null,
            collegeRecipt: req.files['collegeRecipt'] ? req.files['collegeRecipt'][0].path : null
        };

        const newApplication = new Application(applicationData);

        const existingApplication = await Application.findOne(
            {
                scholorshipId: newApplication.scholorshipId,
                student: newApplication.student
            });

        if (existingApplication) {
            return res.status(400).
                json({ message: "You are already applied for this Scholorship" })
        }
        newApplication.status = 'Pending';

        await newApplication.save();
        res.status(201).json(newApplication);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};


export const findById = async (req, res) => {
    try {
        const admin = req.params.id;

        const Applications = await Application.find({ admin });

        if (!Applications || Applications.length === 0) {
            return res.status(404).json({ message: "No Applications found" });
        }

        return res.status(200).json(Applications);

    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const findByStudent = async (req, res) => {
    try {

        const Applications = await Application.find({ student: req.params.student });

        if (!Applications || Applications.length === 0) {
            return res.status(404).json({ message: "No Applications found" });
        }

        return res.status(200).json(Applications);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const findByOrganization = async (req, res) => {
    try {
       // const organizationId = req.params.organization;

        // Find all scholarships for the given organization
        const scholarships = await request.find();

        if (!scholarships.length) {
            return res.status(404).json({ message: 'No scholarships found for this organization.' });
        }

        // Get all application IDs for the scholarships
        const scholarshipIds = scholarships.map(scholarship => scholarship._id);

        // Find all applications for the given scholarship IDs
        const applications = await Application.find({ scholorshipId: { $in: scholarshipIds } });

        // Send the applications in the response
        res.status(200).json(applications);

    } catch (error) {
        console.error('Error fetching applications by organization:', error);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};
export const getApplications = async (req, res) => {
    try {
        const Applications = await Application.find();

        if (!Applications || Applications.length === 0) {
            return res.status(404).json({ message: "No Applications found" });
        }

        return res.status(200).json(Applications);

    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const adminApproval = async (req, res) => {

    const id = req.params.id;

    const application = await Application.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.status = "Approved By Admin";

    await Application.findByIdAndUpdate(id, application, { new: true });

    sendApprovalEmail(application.email, application.firstName);
    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const adminRejection = async (req, res) => {
    const id = req.params.id;
    const { remarks } = req.body;  // Get rejection remarks from request body

    const application = await Application.findById(id);

    if (!application) {
        return res.status(404).json({ message: "Application Not Found" });
    }

    application.status = "Rejected By Admin";
    application.remarks = remarks;  // Add rejection remarks to application

    await Application.findByIdAndUpdate(id, application, { new: true });

    sendRejectEmail(application.email, application.firstName, application.remarks)
    return res.status(200).json({ message: "Status updated successfully" });
}



export const organizationApproval = async (req, res) => {
    const id = req.params.id;
    const { approvedAmount } = req.body;  // Get approved amount from request body

    console.log(req.body);

    const application = await request.findById(id);

    if (!application) {
        return res.status(404).json({ message: "Application Not Found" });
    }

    application.remark = `${'Approved By Admin-'}${approvedAmount}`;
    //application.approvedAmount = approvedAmount;  // Add approved amount to application
    console.log(application.remark);
    console.log(id);
    await request.findByIdAndUpdate(id, application, { new: true });

    //sendOrgApprovalEmail(application.userEmail, application.fullName, application.approvedAmount);
    return res.status(200).json({ message: "Status updated successfully" });
}


export const organizationRejection = async (req, res) => {
    const id = req.params.id;
    const { remarks } = req.body;  // Get rejection remarks from request body

    const application = await Application.findById(id);

    if (!application) {
        return res.status(404).json({ message: "Application Not Found" });
    }

    application.status = "Rejected By Organization";
    application.remarks = remarks;  // Add rejection remarks to application

    await Application.findByIdAndUpdate(id, application, { new: true });

    sendOrgRejectEmail(application.email, application.firstName, application.remarks)
    return res.status(200).json({ message: "Status updated successfully" });
}
