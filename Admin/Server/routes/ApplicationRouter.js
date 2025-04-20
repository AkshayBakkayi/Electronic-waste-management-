import express from 'express';
import { upload } from '../utils/multer-config.js';
import { Apply, organizationApproval, organizationRejection, findById, findByStudent, getApplications, adminApproval, adminRejection, findByOrganization } from '../controller/ApplicationController.js';

const applicationRouter = express.Router();

applicationRouter.post('/apply', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'marksCards', maxCount: 1 },
    { name: 'collegeRecipt', maxCount: 1 }
]), Apply);

applicationRouter.get("/findById/:id", findById);
applicationRouter.get("/findByStudent/:student", findByStudent);
applicationRouter.get("/findByOrg/", findByOrganization);

applicationRouter.get("/", getApplications);

applicationRouter.put("/adminApproval/:id", adminApproval);
applicationRouter.put("/adminRejection/:id", adminRejection);
applicationRouter.put("/organizationApproval/:id", organizationApproval);
applicationRouter.put("/organizationRejection/:id", organizationRejection);

export default applicationRouter;
